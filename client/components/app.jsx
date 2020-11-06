import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCart = this.addToCart.bind(this);
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

  render() {

    if (this.state.view.name === 'catalog') {
      return (
        <div>
          <div>
            <Header cartItemCount={this.state.cart.length} />
            <ProductList setView={this.setView} />
          </div>
        </div>
      );
    }
    if (this.state.view.name === 'details') {
      return (
        <div>
          <div>
            <Header cartItemCount={this.state.cart.length} />
            <ProductDetails addItem={this.addToCart} setView={this.setView} product={this.state.view.params.product} />
          </div>
        </div>
      );
    }
  }
}
