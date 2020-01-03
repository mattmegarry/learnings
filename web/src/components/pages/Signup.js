import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { openRequest } from "../../utils/http.utils";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      signupSuccess: false,
      errorMessages: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;

    this.setState({
      [name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const body = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };

    openRequest("/users/signup", "POST", body)
      .then(res => {
        if (res.status === 200) {
          this.setState({ signupSuccess: true });
        } else if (res.status === 400 || res.status === 500) {
          this.setState({ errorMessages: res.data });
        }
      })
      .catch(e => console.error(e));
  }

  render() {
    const { signupSuccess, errorMessages } = this.state;

    if (signupSuccess) return <Redirect to="/dashboard" />;

    const errorListItems = errorMessages.map((message, index) => (
      <li key={index}>{message}</li>
    ));

    return (
      <div>
        <fieldset className="signup-fieldset">
          <legend>Signup Now!</legend>
          <form className="signup-form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              placeholder="Username"
            />
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="Password"
            />
            <div>{this.state.message}</div>
            <ul className="user-errors">{errorListItems}</ul>
            <input type="submit" value="Submit" />
          </form>
        </fieldset>
      </div>
    );
  }
}

export default Signup;
