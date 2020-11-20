import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {

  render() {
    const summaryArray = this.props.cart.map((product, index) =>
      <CartSummaryItem
        product={product}
        key={index}
      />
    );

    const price = this.props.cart.filter(item => item.price);
    const totalPrice = price.reduce((prevPrice, nextPrice) => prevPrice + nextPrice.price, 0);
    const priceCheck = (totalPrice / 100).toFixed(2);

    if (this.props.cart.length === 0) {
      return (

        <div className="d-flex justify-content-center align-items-center text-center">
          <div>
            <img src="/images/empty-heart.png" alt="pixel heart"></img>
            <h3 className="m-1">Uh Oh! There are currently no items in your cart. Add a product to replenish your health!</h3>
          </div>
        </div>

      );
    } else {
      return (
        <div className="container">

          <div className="row">
            <div className="col-12 hvr-icon-wobble-horizontal mt-3" onClick={() => this.props.setView('catalog', {})}>
              <p>
                <i className="fas fa-arrow-left hvr-icon-wobble pr-2"></i> Back to Catalog
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <h2>My Cart</h2>
            </div>
          </div>

          <div className="row">
            <div className="col-12 d-flex justify-content-center flex-wrap summary-container m-auto">
              {summaryArray}
            </div>
          </div>

          <div className="row mb-5">
            <div className="col">
              <h3>{`Item Total: $${priceCheck}`}</h3>
            </div>
            <div className="col d-flex justify-content-end">
              <button className="btn btn-outline-dark btn-style" onClick={() => this.props.setView('checkout', {})}>Checkout</button>
            </div>
          </div>
        </div>
      );
    }
  }
}
