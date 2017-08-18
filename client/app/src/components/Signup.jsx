import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import '../app.css';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { userSignupRequest } from '../actions/signupAction';

class Signup extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      email: '',
      error: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(event) {
    this.setState({
      [event.target.name] : event.target.value
    });
  }

  
  onSubmit(event) {
    event.preventDefault();
    this.props.userSignup(this.state).then((error) => {
      if(!error) {
        browserHistory.push('/login');
      }
      else {
        this.setState({ error: error.response.data.message });
        browserHistory.push('/');
        toastr.error(this.state.error);
      }
    }) 
    //console.log(this.state);
    // axios.post('/api/v1/user', this.state )
    // .then(function (response) {
    //   // redirect user
    // })
    // .catch(function (error) {
    //   // show error message
    //   console.log(error);
    // });
  }

  render() {
    return (
      <section className="site-container padding-tb">
		
        <section className="card wow fadeInLeft">
          
          <h3 className="wow fadeInDown" data-wow-delay="0.4s">Todoly - Signup</h3>

          <form action="#" className="form" method="post" onSubmit={this.onSubmit}>
              <div className="form__wrapper wow fadeInDown" data-wow-delay="0.5s">
                  <input type="name" onChange={this.onChange} className="form__input validate" id="name" name="name" required/>
                  <label className="form__label" htmlFor="name">
                <span className="form__label-content">Enter Full Name</span>
              </label>
              </div>
              <div className="form__wrapper wow fadeInDown" data-wow-delay="0.5s">
                  <input type="email" onChange={this.onChange} className="form__input validate" id="email" name="email" required/>
                  <label className="form__label" htmlFor="email">
                <span className="form__label-content">Email</span>
              </label>
              </div>

              <div className="form__wrapper wow fadeInDown" data-wow-delay="0.6s">
                  <input type="password" onChange={this.onChange} className="form__input validate" id="password"  name="password" required/>
                  <label className="form__label" htmlFor="password">
                <span className="form__label-content">Password</span>
              </label>
                
              </div>

              <div className="form__wrapper--submit wow fadeInLeft" data-wow-delay="0.7s">
                <div className="form__input-submit">
                    <button type="submit" name="submit" className="btn btn-block">Sign Up</button>
                  </div>
              </div>
          </form>
          <div className="text-center text-small wow fadeInLeft" data-wow-delay="0.8s">Already have an account? <Link to='/login'>Log In</Link></div>

        </section>
			</section>
    );
  }
}

Signup.propTypes = {
  userSignup: React.PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
  return {
    userSignup: userDetails => dispatch(userSignupRequest(userDetails))
  }
}
export default connect(null, mapDispatchToProps) (Signup);

