import React from 'react';
import ProductListItem from './product-list-item';
import Modal from './modal';

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

      <div className="col-md-6 col-sm-12 col-lg-4" key={index}>
        <ProductListItem
          onClick={() => this.handleClick(product.productId)}
          product={product}

          setView={this.props.setView} />
      </div>
    );

    return (
      <div className="main-container">
        <div className="header hero-img">
        </div>
        <Modal props={this.props.view} />
        <div className="row d-flex justify-content-center m-3">
          {productsArray}
        </div>
      </div>
    );
  }
}
