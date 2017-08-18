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

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.allTodos[0]._id, 'mm');
    // if(nextProps.allTodos) {
    //   const id  = nextProps.allTodos[0]._id;
    //   this.props.getTasks(id);
    // }
    
    // this.props.getTasks(nextProps.allTodos[1]._id);
    // this.setState({ myTodos: nextProps.allTodos })
  }


  render() {
    console.log(this.props.allTodos, 'oooo');
    //console.log(this.state.myTodos, 'My todos');
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
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.userReducer.user._id,
    allTodos: state.todosReducer.todos
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTodos: () => dispatch(getAllTodos()),
    getTasks: (todoId) => dispatch(getAllTasks(todoId))
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (Sidebar);