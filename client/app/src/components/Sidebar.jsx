import React, { Component } from 'react';
import TodoList from './TodoList';
import User from './User';
import CreateTodo from './CreateTodo';
import { connect } from 'react-redux';
import { getAllTodos } from '../actions/todoAction.js';
import { getAllTasks } from '../actions/taskAction.js';

class Sidebar extends Component {
  constructor(props) {
    super(props); 

    this.state = {
      myTodos: []
    }
  }

  componentWillMount() {
    this.props.getTodos();
    // this.setState({ myTodos: this.props.allTodos})
  }

  render() {
    return(
      <div className="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
         <User />
         <CreateTodo />
         <TodoList todos={this.props.allTodos}/>
      </div>
    );
  }
}

Sidebar.propTypes = {
  getTodos: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.userReducer.user._id,
    allTodos: state.todosReducer.todos
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTodos: () => dispatch(getAllTodos()),
    getTasks: todoId => dispatch(getAllTasks(todoId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
