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
        <div>
          <h3>There are currently no items in your cart</h3>
        </div>
      );
    } else {
      return (
        <div className="summary-main-container">
          <div className="m-3">
            <div onClick={() => this.props.setView('catalog', {})}>
              {'< Back to Catalog'}
            </div>
            <div className="m-2">
              <h2>My Cart</h2>
            </div>
          </div>
          <div className="d-flex justify-content-center flex-wrap summary-container">
            {summaryArray}
          </div>
          <div className="d-flex">
            <h2 className="m-3 ml-auto">{`Item Total: $${priceCheck}`}</h2>
          </div>
        </div>
      );
    }
  }
}
