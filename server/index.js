require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
    select "productId",
           "name",
           "price",
           "image",
           "shortDescription"
      from "products"
  `;

  db.query(sql)
    .then(result => {
      const product = result.rows;
      res.status(200).json(product);
    })
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const productId = parseInt(req.params.productId, 10);

  const sql = `
    select *
      from "products"
      where "productId" = $1
  `;

  const values = [req.params.productId];

  db.query(sql, values)
    .then(result => {
      if (result.rowCount === 0) {
        next(new ClientError(`productId ${productId} does not exist in the database`, 404));
      } else {
        res.status(200).json(result.rows[0]);
      }
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  if (!req.session.cartId) {
    res.json([]);
  } else {
    const sql = `
      select "c"."cartItemId",
             "c"."price",
             "p"."productId",
             "p"."image",
             "p"."name",
             "p"."shortDescription"
        from "cartItems" as "c"
        join "products" as "p" using ("productId")
      where "c"."cartId" = $1
    `;
    const values = [req.session.cartId];

    db.query(sql, values)
      .then(result => {
        return res.status(200).json(result.rows);
      })
      .catch(err => next(err));
  }
});

app.post('/api/cart', (req, res, next) => {
  const productId = parseInt(req.body.productId, 10);
  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({ error: '"productId" must be a positive integer' });
  }
  if (typeof productId === 'undefined') {
    throw (new ClientError(`cannot find product with ${productId}`, 400));
  }

  const sql = `
    select "price"
      from "products"
      where "productId" = $1
  `;

  const values = [req.body.productId];

  db.query(sql, values)
    .then(selectPriceResult => {
      if (selectPriceResult.rows.length === 0) {
        throw (new ClientError(`cannot find product with 'productId' ${productId}`, 400));
      }

      if (req.session.cartId === undefined) {
        const sql = `
          insert into "carts" ("cartId", "createdAt")
            values (default, default)
            returning "cartId"
        `;
        return db.query(sql)
          .then(createCartResult => {
            return {
              price: selectPriceResult.rows[0].price,
              cartId: createCartResult.rows[0].cartId
            };
          });
      } else {
        return ({
          price: selectPriceResult.rows[0].price,
          cartId: req.session.cartId
        });
      }
    })
    .then(returnResults => {
      req.session.cartId = returnResults.cartId;

      const sql = `
        insert into "cartItems" ("cartId", "productId", "price")
          values ($1, $2, $3)
          returning "cartItemId"
      `;

      const values = [req.session.cartId, productId, returnResults.price];

      return db.query(sql, values);
    })
    .then(newCartItemId => {
      const sql = `
        select "c"."cartItemId",
            "c"."price",
            "p"."productId",
            "p"."image",
            "p"."name",
            "p"."shortDescription"
          from "cartItems" as "c"
          join "products" as "p" using ("productId")
        where "c"."cartItemId" = $1
      `;

      const values = [newCartItemId.rows[0].cartItemId];

      return db.query(sql, values)
        .then(selectCartItemIdResult => {
          const cartItem = selectCartItemIdResult.rows[0];
          res.status(201).json(cartItem);
        });
    })
    .catch(err => next(err));
});

app.post('/api/orders', (req, res, next) => {
  if (!req.session.cartId) {
    throw (new ClientError('cartId does not exist', 400));
  }

  const customerName = req.body.name;
  const customerCard = req.body.creditCard;
  const customerAddress = req.body.shippingAddress;

  if (!customerName) {
    throw (new ClientError("Missing customer's name", 400));
  }
  if (!customerCard) {
    throw (new ClientError("Missing customer's card information", 400));
  }
  if (!customerAddress) {
    throw (new ClientError("Missing customer's shipping address", 400));
  }

  const sql = `
    insert into "orders" ("cartId", "name", "creditCard", "shippingAddress")
      values ($1, $2, $3, $4)
      returning *
  `;

  const values = [req.session.cartId, customerName, customerCard, customerAddress];

  return db.query(sql, values)
    .then(result => {
      delete req.session.cartId;
      res.status(201).json(result.rows[0]);
    })
    .catch(err => console.error(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
