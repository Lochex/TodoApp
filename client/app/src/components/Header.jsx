import React, { Component } from 'react';
import Navbar from './Navbar.jsx';

class Header extends Component {

  render() {
    return(
      <header className="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600 is-casting-shadow">
        <Navbar />
      </header>
    );
  }
}

export default Header;
