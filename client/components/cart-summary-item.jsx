import React from 'react';

export default class CartSummaryItem extends React.Component {

  render() {
    return (
      <div className="container m-4">
        <div className="d-flex justify-content-center border border-dark summary-item-container">
          <div className="col-md-6 col-sm-3 m-auto">
            <img src={this.props.product.image} className="p-3 summary-item-img"></img>
          </div>
          <div className="col-md-6 p-3 col-sm-3">
            <h3>{this.props.product.name}</h3>
            <p>{'$' + (this.props.product.price / 100).toFixed(2)}</p>
            <p>{this.props.product.shortDescription}</p>
          </div>
        </div>

      </div>
    );
  }

}
