import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      redirectToReferrer: false,
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
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(body, errorMessages => {
      if (!errorMessages) {
        this.setState({ redirectToReferrer: true });
      } else {
        this.setState({ errorMessages: errorMessages });
      }
    });
  }

  render() {
    const userHomePath = { pathname: "/dashboard" };
    const { from } = this.props.location.state || userHomePath;
    const { redirectToReferrer, errorMessages } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;
    if (this.props.authTokenPresent) return <Redirect to={userHomePath} />;

    const errorListItems = errorMessages.map((message, index) => (
      <li key={index}>{message}</li>
    ));

    return (
      <div>
        <fieldset className="login-fieldset">
          <legend>Login</legend>
          <form className="login-form" onSubmit={this.handleSubmit}>
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

export default Login;
