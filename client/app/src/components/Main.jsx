import React, { Component } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import TodoTasks from './TodoTasks';

class Main extends Component {

  render() {
    return(
      <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
        <Header />  
        <Sidebar /> 
        {this.props.children}  
      </div>
    );
  }
}

Main.defaultProps = {
  children: [] || null
};

export default Main;