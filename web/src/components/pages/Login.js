import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      redirectToReferrer: false,
      redirectToUserHome: false,
      errorMessages: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {}

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
        if (this.props.location.state) {
          console.log("referer");
          this.setState({ redirectToReferrer: true });
        } else {
          console.log("home");
          this.setState({ redirectToUserHome: true });
        }
      } else {
        this.setState({ errorMessages: errorMessages });
      }
    });
  }

  render() {
    const userHomePath = { pathname: "/" };
    const redirected = this.props.location.state;
    const {
      redirectToReferrer,
      redirectToUserHome,
      errorMessages
    } = this.state;

    if (this.state.authTokenPresent) return <Redirect to={userHomePath} />;
    if (redirectToReferrer) return <Redirect to={redirected.from} />;
    if (redirectToUserHome) return <Redirect to={userHomePath} />;

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
