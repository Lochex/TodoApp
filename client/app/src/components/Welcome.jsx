import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllTodos } from '../actions/todoAction.js';

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myTodos: []
    };

    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    this.props.getTodos();
    // this.setState({ myTodos: this.props.allTodos})
  }

  componentDidUpdate() {
    componentHandler.upgradeDom();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ myTodos: nextProps.allTodos });
  }

  onClick(event) {
    event.preventDefault();
  }


  render() {
    const myTodosCount = this.state.myTodos.length;
    return(
      <main className="mdl-layout__content mdl-color--grey-100">
        {myTodosCount}
      </main>
    );
  }
}

Welcome.propTypes = {
  getTodos: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    allTodos: state.todosReducer.todos
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTodos: () => dispatch(getAllTodos())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
