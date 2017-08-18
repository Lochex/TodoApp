import React, { Component } from 'react';
import { connect } from 'react-redux';

class User extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div>
        <header className="demo-drawer-header">
          <img className="demo-avatar" />
          <div className="demo-avatar-dropdown">
            <span>Welcome @ {this.props.currentUser}</span>
            <div className="mdl-layout-spacer"></div>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const user = state.userReducer.user.name;
  return {
    currentUser: user,
  }
}

export default connect(mapStateToProps) (User);