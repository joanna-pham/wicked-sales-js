import React from 'react';

export default class CartSummaryItem extends React.Component {

  render() {
    return (
      <div className="container m-4">
        <div className="row d-flex justify-content-center border border-dark p-5">
          <div className="col-md-6 col-sm d-flex justify-content-center">
            <img src={this.props.product.image} className="summary-item-img"></img>
          </div>
          <div className="col-md-6 col-sm p-3">
            <h3>{this.props.product.name}</h3>
            <p>{'$' + (this.props.product.price / 100).toFixed(2)}</p>
            <p>{this.props.product.shortDescription}</p>
          </div>
        </div>

      </div>
    );
  }

}
