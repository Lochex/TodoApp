import React, { Component } from 'react'; 


class Signup extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      password: '',
      email: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(event) {
    this.setState({[event.target.name] : event.target.value});
  }

  onSubmit(event) {
    event.preventDefault();
    console.log(this.state);
  }


  render() {
    return (
      <div>
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s6">
                <input name="fullName" onChange={this.onChange} id="full_name" type="text" className="validate" />
                <label htmlFor="last_name">Full Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input name= "password" onChange={this.onChange} id="password" type="password" className="validate" />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input name="email" onChange={this.onChange} id="email" type="email" className="validate" />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row">
              <button className="btn waves-effect waves-light" onClick={this.onSubmit} type="submit" name="action">Submit
                {/* <i class="material-icons right">send</i> */}
              </button>
            </div>
          </form>
        </div>
      </div>
    ); 
  }
}

export default Signup;