import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'checkout',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  componentDidMount() {
    this.getCartItems();
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(cartItemCount => {
        this.setState({
          cart: cartItemCount
        });
      });
  }

  addToCart(product) {
    fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    }).then(res => res.json())
      .then(result => this.setState({ cart: this.state.cart.concat(result) }))
      .catch(err => console.error(err));
  }

  placeOrder(order) {
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    }).then(res => res.json())
      .then(result =>
        this.setState({
          cart: [],
          view: { name: 'catalog', params: {} }
        })
      )
      .catch(err => console.error(err));
  }

  renderSwitch(state) {
    switch (state) {
      case 'catalog':
        return <ProductList setView={this.setView} view={this.state.view.name}/>;
      case 'details':
        return <ProductDetails addItem={this.addToCart} setView={this.setView} product={this.state.view.params.product} />;
      case 'cart':
        return <CartSummary cart={this.state.cart} setView={this.setView} />;
      case 'checkout':
        return <CheckoutForm setView={this.setView} placeOrder={this.placeOrder} cart={this.state.cart} view={this.state.view.name}/>;
    }
  }

  render() {

    return (
      <div>
        <Header cartItemCount={this.state.cart.length} setView={this.setView} />
        {this.renderSwitch(this.state.view.name)}
      </div>
    );

  }
}
