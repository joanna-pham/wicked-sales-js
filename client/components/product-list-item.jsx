import React from 'react';

export default class ProductListItem extends React.Component {

  render() {
    return (
      <div className="card m-4 p-2 hvr-outline-in product-item-container" onClick={() => this.props.setView('details', { product: this.props.product })}>
        <img src={this.props.product.image} className="product-img p-4 img-fluid" alt={this.props.product.name}></img>
        <div className="card-body">
          <h5>{this.props.product.name}</h5>
          <p>{'$' + (this.props.product.price / 100).toFixed(2)}</p>
          <p>{this.props.product.shortDescription}</p>
        </div>
      </div>
    );
  }
}
