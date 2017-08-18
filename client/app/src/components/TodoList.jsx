import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getAllTasks } from '../actions/taskAction.js';
import { getTodo } from '../actions/todoAction.js';

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    console.log('Elo..............', id);
    browserHistory.push(`/todos/${id}`)
    //this.props.getTasks(id);
    //console.log(this.props, '====props=====');
    //console.log(this.props.getTasks(id), '==========id========');
    //this.props.getTodo();
  }

  render() {
    return(
      <div>
        <nav className="demo-navigation mdl-navigation mdl-color--blue-grey-800">
          {this.props.todos.map((todo, idx) => 
            <a
              key={`${todo.title}-${idx}`}
              className="mdl-navigation__link"
              onClick={() => this.handleClick(todo._id)}
            >
              <i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">inbox</i>
              {todo.title}</a>
          )}    
          <div className="mdl-layout-spacer"></div>
        </nav>
      </div>
    );
  }
}

TodoList.propTypes = {
  getTasks: React.PropTypes.func.isRequired,
  getTodo: React.PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTasks: (todoId) => dispatch(getAllTasks(todoId)),
    getTodo: (todoId) => dispatch(getTodo(todoId))
  }
}

export default connect(null, mapDispatchToProps) (TodoList);