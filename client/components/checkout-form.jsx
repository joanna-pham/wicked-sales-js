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
    } else if (this.state.creditCard.length === 0) {
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
            </div>
          </form>
        </div>

        <div className="row">
          <div className="col-12">
            {this.state.error
              ? <p className="text-red text-center">Please fill out the entire form</p>
              : <p className="d-none"></p>
            }
          </div>
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
