import React from 'react';
import Modal from './modal';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: '',
      error: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const order = {
      name: this.state.name,
      creditCard: this.state.creditCard,
      shippingAddress: this.state.shippingAddress
    };

    if (this.state.name.length === 0) {
      this.setState({ error: true });
    } else if (this.state.creditCard.length <= 15) {
      this.setState({ error: true });
    } else if (this.state.shippingAddress.length === 0) {
      this.setState({ error: true });
    } else {
      this.props.placeOrder(order);
    }
  }

  render() {
    const price = this.props.cart.filter(item => item.price);
    const totalPrice = price.reduce((prevPrice, nextPrice) => prevPrice + nextPrice.price, 0);
    const priceCheck = (totalPrice / 100).toFixed(2);

    return (
      <div className="checkout-container container">
        <Modal props={this.props.view} />
        <div className="row m-3">
          <h2>Checkout</h2>
        </div>
        <div className="m-3">
          <h4>Order Total: ${priceCheck}</h4>
        </div>
        <div className="row d-flex justify-content-center align-items-center m-auto">
          <form onSubmit={this.handleSubmit}>
            <div className="col m-4">
              <div className="form-group">
                <label>Name:</label>
              </div>
              <input
                type="text"
                value={this.state.name}
                onChange={() => this.setState({ name: event.target.value })}
                key="name"
                required
              />
              {this.state.name.length === 0
                ? <i className="fas fa-times text-red ml-2"></i>
                : <i className="fas fa-check text-green ml-2"></i>
              }
            </div>

            <div className="col m-4">
              <div className="form-group">
                <label>Credit Card:</label>
              </div>
              <input
                type="text"
                value={this.state.creditCard}
                onChange={() => this.setState({ creditCard: event.target.value })}
                key="card"
                required
              />
              {this.state.creditCard.length <= 15
                ? <i className="fas fa-times text-red ml-2"></i>
                : <i className="fas fa-check text-green ml-2"></i>
              }
            </div>

            <div className="col m-4">
              <div className="form-group">
                <label>Shipping Address:</label>
              </div>
              <textarea
                type="text"
                value={this.state.shippingAddress}
                onChange={() => this.setState({ shippingAddress: event.target.value })}
                rows="6"
                key="address"
                required
              />
              {this.state.shippingAddress.length <= 6
                ? <i className="fas fa-times text-red ml-2"></i>
                : <i className="fas fa-check text-green ml-2"></i>
              }
            </div>
          </form>
        </div>

        <div className="row">
          <div className="col-6">
            <p className="hvr-icon-wobble-horizontal" onClick={() => this.props.setView('catalog', {})}>
              <i className="fas fa-arrow-left hvr-icon-wobble pr-2"></i> Continue Shopping
            </p>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <button className="btn btn-outline-dark btn-style" onClick={this.handleSubmit}>Place Order</button>
          </div>
        </div>
      </div>
    );
  }

}
