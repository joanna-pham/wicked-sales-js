import React from 'react';

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
      <div className="checkout-container">
        <div className="row m-3">
          <h2>Checkout</h2>
        </div>
        <div className="m-3">
          <h4>Order Total: ${this.totalPrice()}</h4>
        </div>
        <div className=" d-flex justify-content-center align-items-center m-auto">
          <form onSubmit={this.handleSubmit}>
            <div className="m-4">
              <div>
                <label>Name:</label>
              </div>
              <input
                type="text"
                value={this.state.name}
                onChange={() => this.setState({ name: event.target.value })}
                size="100"
                key="name"
              />
            </div>

            <div className="m-4">
              <div>
                <label>Credit Card:</label>
              </div>
              <input
                type="text"
                value={this.state.creditCard}
                onChange={() => this.setState({ creditCard: event.target.value })}
                size="100"
                key="card"
              />
            </div>

            <div className="m-4">
              <div>
                <label>Shipping Address:</label>
              </div>
              <textarea
                type="text"
                value={this.state.shippingAddress}
                onChange={() => this.setState({ shippingAddress: event.target.value })}
                cols="100"
                rows="6"
                key="address"
              />
            </div>

          </form>
        </div>
        <div className="d-flex m-4" onClick={() => this.props.setView('catalog', {})}>
          <h5>{'< Continue Shopping'}</h5>
          <span className="ml-auto">
            <button className="ml-auto" onClick={this.handleSubmit}>Place Order</button>
          </span>
        </div>

      </div>
    );
  }

}
