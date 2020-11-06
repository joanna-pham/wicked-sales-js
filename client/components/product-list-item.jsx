import React from 'react';

export default class ProductListItem extends React.Component {

  render() {
    return (
      <div
        className="container col-md-3 m-2"
        onClick={() => this.props.setView('details', { product: this.props.product })}>
        <div className="d-flex">
          <div
            className="product-item-container border border-dark p-3 justify-content-center align-items-center">
            <img src={this.props.product.image} className="product-img pb-4" alt={this.props.product.name}></img>
            <h5>{this.props.product.name}</h5>
            <p>{'$' + (this.props.product.price / 100).toFixed(2)}</p>
            <p>{this.props.product.shortDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}
