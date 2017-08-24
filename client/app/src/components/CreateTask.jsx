import React, { Component } from 'react';
import { Link } from 'react-router';
import toastr from 'toastr';
import { connect } from 'react-redux';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import { addTask } from '../actions/taskAction';
// import createtodo action

class CreateTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      priorityLevel: '',
      due: moment(new Date()).format('YYYY-MM-DD')
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  // componentWillReceiveProps(nextProps) {
  //   this.setState({ owner: nextProps.currentUser })
  // }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.createTask(this.state, this.props.todoId).then((error) => {
      if (error) {
        toastr.error(error.response.data.message);
      }
    });
    this.setState({ content: '' });
    // console.log(this.state);
  }

  render() {
    const { content, due } = this.state;
    return (
      <form>
        <div className="mdl-textfield mdl-js-textfield create-task-wrapper">
          <div className="create-task">
            <textarea
              className="mdl-textfield__input"
              onChange={this.handleChange}
              type="text"
              rows="6"
              value={content}
              name="content"
              required
            >
            </textarea>
            <label
              className="mdl-textfield__label"
              htmlFor="create-task"
            >
              Create new Task here...
            </label>
          </div>
          <div className="sch-pr">
            <div className="schedule">
              <label
                htmlFor="due"
              >
                Schedule:
              </label>
              <input
                type="date"
                placeholder="Schedule"
                name="due"
                value={due}
                onChange={this.handleChange}
              />
            </div>
            <div className="priority">
              <span>Choose Priority Level:</span>
              <div className="pr">
                <input type="radio" name="priorityLevel" onClick={this.handleChange} value="normal" selected/>
                <label className="prlevel" htmlFor="priorityLevel">Normal</label>
              </div>
              <div className="pr">
                <input type="radio" name="priorityLevel" onClick={this.handleChange} value="urgent" />
                <label className="prlevel" htmlFor="priorityLevel">Urgent</label>
              </div>
              <div className="pr">
                <input type="radio" name="priorityLevel" onClick={this.handleChange} value="critical" />
                <label className="prlevel" htmlFor="priorityLevel">Critical</label>
              </div>
            </div>
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
};

const mapDispatchToProps = dispatch => ({
  createTask: (taskContent, selectedTodoId) =>
    dispatch(addTask(taskContent, selectedTodoId))
});

export default connect(null, mapDispatchToProps)(CreateTask);
