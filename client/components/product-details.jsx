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
          <div className="row m-3">
            <div onClick={this.handleClick}>
              {'< Back to Catalog'}
            </div>
          </div>
          <div className="detail-container p-5">
            <div className="row">
              <div className="col-md-6">
                <img src={this.state.product.image} className="detail-img"></img>
              </div>
              <div className="col-md-6">
                <h3>{this.state.product.name}</h3>
                <h4>{'$' + (this.state.product.price / 100).toFixed(2)}</h4>
                <h4>{this.state.product.shortDescription}</h4>
                <button onClick={() => this.props.addItem(this.state.product)}>Add to Cart</button>
              </div>
            </div>
            <div className="row m-3">
              <h4>{this.state.product.longDescription}</h4>
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
