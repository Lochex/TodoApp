import React, { Component } from 'react';
import { connect } from 'react-redux';
import dateformat from 'dateformat';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import Loading from './Loading.jsx';
import CreateTask from './CreateTask.jsx';
import { updateTask, getAllTasks, deleteTask } from '../actions/taskAction';
import { getTodo } from '../actions/todoAction';

class TodoTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      todoId: '',
      complete: false,
      editAble: false,
      editTask: []
    };

    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.editTask = this.editTask.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.props.getAllTasks(nextProps.params.id);
      this.props.getTodo(nextProps.params.id);
    }
  }

  componentDidMount() {
    this.props.getAllTasks(this.props.params.id);
    this.props.getTodo(this.props.params.id);
  }


  componentDidUpdate() {
    componentHandler.upgradeDom();
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onClick(event) {
    event.preventDefault();
  }

  handleClick(id) {
    this.props.allTasks.map((task) => {
      if (task._id === id) {
        this.props.updateTask(id, { complete: !task.complete }, this.props.params.id);
      }
    });
  }

  editTask(id) {
    this.cancelEdit();
    this.props.allTasks.map((task) => {
      if (task._id === id) {
        const nextState = this.state;
        nextState.editTask.push(id);
        this.setState({ ...nextState, name: task.content });
      }
    });
  }

  updateContent(id) {
    this.props.updateTask(id, { content: this.state.name }, this.props.params.id);
    this.cancelEdit();
    // console.log(this.state);
  }

  cancelEdit() {
    let nextState = this.state;
    nextState.editTask = [];
    this.setState(nextState);
  }

  handleDelete(id) {
    console.log(id);
    this.props.deleteTask(id, this.props.params.id);
  }


  render() {
    const { params: { id }, allTasks: tasks } = this.props;
    const allTasks = tasks.map((task, index) =>
      <li key={`${index}-${id}-task`} className={`${task.priorityLevel}`}>
        {this.state.editTask.filter(taskId => taskId === task._id).length > 0 ?
          <div className="task-actions">
            <div>
              <textarea
                className="mdl-textfield__input editbox"
                onChange={this.onChange}
                name="name"
                rows="3"
                value={this.state.name}
              >
              </textarea>
            </div>
            <div className="btn-actions">
              <button
                className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent edit-button"
                onClick={() => this.updateContent(task._id)}
              >
                Save
              </button>
              <button
                className="mdl-button mdl-js-button mdl-button--raised edit-button"
                onClick={() => this.cancelEdit()}
              >
                Cancel
              </button>
            </div>
          </div> :
          <div>
            <div className="due-date">
              <span className="">{dateformat(task.due, 'mmm dS')}</span>
            </div>
            <div className="task-check">
              <span><i className={`mdl-color-text--${task.priorityLevel}-400 material-icons`} onClick={() => this.handleClick(task._id)} role="presentation">{ task.complete ? 'check_circle' : 'fiber_manual_record' }</i></span>
            </div>
            <div className="task-content">
              <span onClick={() => this.editTask(task._id)} className={`${task.complete}`}>{task.content}</span>
            </div>
            <div className="del-task">
              <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" onClick={() => this.handleDelete(task._id)} id={`tskbtn-${index}`}>
                <i className="material-icons" >delete_forever</i>
              </button>
            </div>
          </div>
        }
      </li>
    );

    return (
      <main className="mdl-layout__content mdl-color--grey-100">
        <div className="mdl-grid demo-content">
          <div className="mdl-cell--8-col-tablet mdl-grid mdl-grid--no-spacing">
            <div className="">
              <h3 className="todo-title" >{this.props.todoTitle}</h3><CreateTask todoId={id} />
                <ul className="">
                  { allTasks }
                </ul>
              </div>
            </div>
          </div>
      </main>
    );
  }
}

TodoTasks.propTypes = {
  updateTask: React.PropTypes.func.isRequired
};

const mapStateToProps = ({ taskReducer, todoReducer }) => {
  const { tasks } = taskReducer;
  const { title } = todoReducer;
  return {
    allTasks: tasks || [],
    todoTitle: title,
  };
};

export default connect(mapStateToProps, { getAllTasks, updateTask, getTodo, deleteTask })(TodoTasks);
