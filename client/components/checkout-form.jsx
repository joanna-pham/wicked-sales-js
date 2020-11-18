import React from 'react';
import Modal from './modal';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.totalPrice = this.totalPrice.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const order = {
      name: this.state.name,
      creditCard: this.state.creditCard,
      shippingAddress: this.state.shippingAddress
    };

    this.props.placeOrder(order);

  }

  totalPrice() {
    const items = this.props.cart;
    let totalPrice = 0;
    items.forEach(item => {
      totalPrice += item.price;
      totalPrice = (totalPrice / 100).toFixed(2);
    });
    return totalPrice;
  }

  render() {

    return (
      <div className="checkout-container container">
        <Modal props={this.props.view}/>
        <div className="row m-3">
          <h2>Checkout</h2>
        </div>
        <div className="m-3">
          <h4>Order Total: ${this.totalPrice()}</h4>
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
              />
            </div>

          </form>
        </div>

        <div className="d-flex m-4">
          <p className="hvr-icon-wobble-horizontal" onClick={() => this.props.setView('catalog', {})}>
            <i className="fas fa-arrow-left hvr-icon-wobble pr-2"></i> Continue Shopping
          </p>
          <span className="ml-auto">
            <button className="ml-auto btn btn-outline-dark btn-style" onClick={this.handleSubmit}>Place Order</button>
          </span>
        </div>

      </div>
    );
  }

}
