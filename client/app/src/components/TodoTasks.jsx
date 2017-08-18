import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Sidebar from './Sidebar';
import Loading from './Loading';
import CreateTask from './CreateTask';
import { updateTask, getAllTasks } from '../actions/taskAction.js';

class TodoTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoId: '',
      complete: false,
    }

    this.handleClick = this.handleClick.bind(this);
  }

  // componentDidUpdate(prevProps,nextState) {
  //   console.log(this.props.params.id, 'previos props');
  //   this.props.getAllTasks(this.props.params.id);
  // }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.params.id !== this.props.params.id) {
      this.props.getAllTasks(nextProps.params.id);
    }
  }

  componentDidMount() {
    this.props.getAllTasks(this.props.params.id);
  }


  componentDidUpdate() {
    componentHandler.upgradeDom();
  }

  onClick(event) {
    event.preventDefault();
  }

  handleClick(id) {
    this.props.allTasks.map((task) => {
      if (task._id === id) {
        this.props.updateTask(id, { complete: !task.complete });
      }
    })
  }


  render() {
    const { params: { id }, allTasks: tasks } = this.props;
    return (
      <main className="mdl-layout__content mdl-color--grey-100">
        <div className="mdl-grid demo-content">
          <div className="demo-cards mdl-cell--8-col-tablet mdl-grid mdl-grid--no-spacing">
            <div className="mdl-card__supporting-text mdl-color-text--blue-grey-50">
              <h3>View options</h3><CreateTask todoId={id} />

              <ul>
                {tasks.sort((a, b) => {
                  return a.createdAt < b.createdAt;
                }).map((task, index) =>
                <li key={`${index}-${id}-task`} className={`${task.priorityLevel}`}>
                <label
                  htmlFor={`chkbox${index}`}
                  className={`mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect`}

                >
                  <input
                    type="checkbox"
                    id={`chkbox${index}`}
                    className="mdl-checkbox__input"
                    onClick={() => this.handleClick(task._id)}
                    checked={false}
                  />
                  <span className={`mdl-checkbox__label ${task.complete}`}>{task.content}</span>
                </label>
              </li>
                  )}
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
}

const mapStateToProps = ({ taskReducer }, { params }) => {
  const { tasks } = taskReducer;
  return {
    allTasks: tasks || [],
  }
}

export default connect(mapStateToProps, { getAllTasks, updateTask })(TodoTasks);
