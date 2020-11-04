import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.getProducts = this.getProducts.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        this.setState({ products: data });
      })
      .catch(err => console.error(err));
  }

  render() {
    const productsArray = this.state.products.map((product, index) =>
      <ProductListItem
        product={product}
        key={index} />
    );
    return (
      <div className="main-container">
        <div className="d-flex justify-content-center flex-wrap m-2">
          {productsArray}
        </div>
      </div>
    );
  }
}
