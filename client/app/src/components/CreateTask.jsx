import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { addTask } from '../actions/taskAction';
// import createtodo action

class CreateTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  // componentWillReceiveProps(nextProps) {
  //   this.setState({ owner: nextProps.currentUser })
  // }
  handleChange(event) {
    this.setState({ content: event.target.value })
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.createTask({ content: this.state.content }, this.props.todoId);
    this.setState({ content: ''});
  }

  render() {
    let { content } = this.state;
    return(
      <form>
        <div className="mdl-textfield mdl-js-textfield create-task-wrapper">
          <div>
            <input
              className="mdl-textfield__input"
              onChange={this.handleChange}
              type="text"
              value={content}
              name="create-task"
              required
            />
            <label
              className="mdl-textfield__label"
              htmlFor="create-task"
            >
              Create new Task here...
            </label>
          </div>

          <div>
            <button 
              className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent add-task"
              onClick={this.onSubmit}
            >
            Add Task
            </button>
          </div>
        
        </div>
      </form>
      

    );
  }
}

CreateTask.propTypes = {
  createTask: React.PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
  return {
    createTask: (taskContent, selectedTodoId) => 
      dispatch(addTask(taskContent, selectedTodoId))
  }
}

export default connect(null, mapDispatchToProps)(CreateTask);