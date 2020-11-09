import React from 'react';

export default class Header extends React.Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <div className="navbar-brand" onClick={() => this.props.setView('catalog', {})}>
            <img src="/images/favicon.png" className="pr-2"></img>
            Wicked Sales
          </div>
          <span className="items-count" onClick={() => this.props.setView('cart', {})}>
            <p>{this.props.cartItemCount} items
              <i className="fas fa-shopping-cart fa-2x"></i></p>
          </span>
        </nav>
      </div>
    );
  }

}
