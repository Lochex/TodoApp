import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout(e) {
    e.preventDefault();
    localStorage.removeItem('jwtToken');
    browserHistory.push('/login');
  }

  render() {
    return(
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">Todoly</span>
          <div className="mdl-layout-spacer"></div>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
            <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <div className="mdl-textfield__expandable-holder">
              <input className="mdl-textfield__input" type="text" id="search" />
              <label className="mdl-textfield__label" htmlFor="search">Enter your query...</label>
            </div>
          </div>
          <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="hdrbtn">
            <i className="material-icons">more_vert</i>
          </button>
          <ul className="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" htmlFor="hdrbtn">
            <li className="mdl-menu__item">Edit Profile</li>
            <li onClick={this.logout} className="mdl-menu__item">Log out</li>
          </ul>
        </div>
    );
  }
}

export default Navbar;
