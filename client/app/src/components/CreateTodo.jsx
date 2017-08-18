import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { addTodo } from '../actions/todoAction';
// import createtodo action

class CreateTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  // componentWillReceiveProps(nextProps) {
  //   this.setState({ owner: nextProps.currentUser })
  // }
  handleChange(event) {
    this.setState({ title: event.target.value })
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.createTodo({ title: this.state.title });
  }

  render() {
    return(
      <form className="create-todo-form" onSubmit={this.onSubmit}>
        <div className="mdl-textfield mdl-js-textfield">
          <input
            className="mdl-textfield__input"
            onChange={this.handleChange}
            type="text"
            name="create-todo"
            required
          />
          <label
            className="mdl-textfield__label"
            htmlFor="create-todo"
          >
            Create Todo here...
          </label>
        </div>
      </form>
    );
  }
}

CreateTodo.propTypes = {
  createTodo: React.PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
  return {
    createTodo: todoText => dispatch(addTodo(todoText))
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.userReducer.user._id
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (CreateTodo);