import React from 'react';

export default class Header extends React.Component {

  render() {
    return (
      <div className=" main header-container">
        <nav className="navbar navbar-dark sticky-top navbar-style">
          <div className="navbar-brand hvr-icon-spin" onClick={() => this.props.setView('catalog', {})}>
            <img src="/images/favicon.png" className="pr-2 icon-style hvr-icon"></img>
            Gamers Unite
          </div>
          <span className="items-count pt-2" onClick={() => this.props.setView('cart', {})}>
            <p>{this.props.cartItemCount} items
              <i className="fas fa-shopping-cart fa-2x"></i></p>
          </span>
        </nav>
      </div>
    );
  }

}
