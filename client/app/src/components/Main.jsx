import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { isLoggedIn } = this.props;
    if (!isLoggedIn) {
      // then redirect (we use a React Router method)
      browserHistory.replace('/login');
    }
  }

  render() {
    return (
      <div>
        { this.props.isLoggedIn ?
          <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
            <Header />
            <Sidebar />
            {this.props.children}
          </div>
          : null
        }
      </div>
    );
  }
}

Main.defaultProps = {
  children: [] || null
};

const mapStateToProps = ({ userReducer }) => {
  return {
    isLoggedIn: userReducer.isAuth
  };
};

export default connect(mapStateToProps)(Main);
