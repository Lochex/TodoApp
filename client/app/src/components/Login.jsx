import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { loginRequest } from '../actions/loginAction';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
      error: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.userLogin(this.state).then((error) => {
      if (!error) {
        browserHistory.push('/dashboard');
      } else {
        this.setState({ error: error.response.data.message });
        browserHistory.replace('/login');
        toastr.error(this.state.error);
      }
    });
  }

  render() {
    return (
      <section className="site-container padding-tb">
        <section className="card wow fadeInLeft">
          <h3 className="wow fadeInDown" data-wow-delay="0.4s">Todoly - Login</h3>
          <form action="#" className="form" method="post" onSubmit={this.onSubmit}>
              <div className="form__wrapper wow fadeInDown" data-wow-delay="0.5s">
                  <input type="email" onChange={this.onChange} className="form__input validate" id="email" name="email" required={true}/>
                  <label className="form__label" htmlFor="email">
                <span className="form__label-content">Email</span>
              </label>
              </div>
              <div className="form__wrapper wow fadeInDown" data-wow-delay="0.6s">
                  <input type="password" onChange={this.onChange} className="form__input validate" id="password" name="password" required={true}/>
                  <small className="form-text text-muted">(Password must contan letters, numbers and a symbol.)</small>
                  <label className="form__label" htmlFor="password">
                    <span className="form__label-content">Password</span>
                  </label>
              </div>

              <div className="form__wrapper--submit wow fadeInLeft" data-wow-delay="0.7s">
                <div className="form__input-submit">
                  <button type="submit" name="submit" className="btn btn-block">Login</button>
                </div>
              </div>
          </form>
          <div className="text-center text-small wow fadeInLeft" data-wow-delay="0.8s">Dont have an account? <Link to='/'>Sign Up</Link></div>
        </section>
      </section>
    );
  }
}

Login.propTypes = {
  userLogin: React.PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: userDetails => dispatch(loginRequest(userDetails))
  };
};

export default connect(null, mapDispatchToProps)(Login);
