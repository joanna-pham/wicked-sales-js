import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.product.productId}`)
      .then(res => res.json())
      .then(data => this.setState({
        product: data
      }))
      .catch(err => console.error(err));
  }

  handleClick() {
    this.props.setView('catalog', {});
  }

  render() {
    if (this.state.product) {
      return (
        <div className="main-container">
          <div className="row m-2 mb-3">
            <div className="hvr-icon-wobble-horizontal" onClick={this.handleClick}>
              <p>
                <i className="fas fa-arrow-left hvr-icon-wobble m-2"></i> Back to Catalog
              </p>
            </div>
          </div>
          <div className="detail-container p-5 card mx-2">
            <div className="row">
              <div className="col-md-6 d-flex justify-content-center">
                <img src={this.state.product.image} className="detail-img m-2"></img>
              </div>
              <div className="col-md-6">
                <h3>{this.state.product.name}</h3>
                <p>{'$' + (this.state.product.price / 100).toFixed(2)}</p>
                <p>{this.state.product.shortDescription}</p>
                <button className="btn btn-outline-dark btn-style m-2" onClick={() => this.props.addItem(this.state.product)}>Add to Cart</button>
              </div>
            </div>
            <div className="row mt-2">
              <p>{this.state.product.longDescription}</p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        null
      );
    }
  }
}
