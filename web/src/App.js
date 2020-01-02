import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { authRequest } from "./utils/http";
import {
  tokenFoundInLocalStorage,
  hydrateUserFromLocalStorage
} from "./utils/clientAuth";

import Header from "./components/blocks/Header";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import UserDash from "./components/pages/UserDash";
import NotFound from "./components/pages/NotFound";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: hydrateUserFromLocalStorage(),
      authTokenPresent: tokenFoundInLocalStorage()
    };

    this.login = this.login.bind(this);
  }

  login(body, cb) {
    authRequest("/users/login", "POST", body)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("username", res.data.user.username);
          localStorage.setItem("userId", res.data.user.id);
          this.setState({
            authTokenPresent: true,
            user: { username: res.data.user.username, id: res.data.user.id }
          });
          cb();
        } else if (res.status === 401 || res.status === 500) {
          cb(res.data);
        }
      })
      .catch(e => console.error(e));
  }

  render() {
    return (
      <div className="wrapper">
        <Header user={this.state.user} />
        <div className="main">
          <Router>
            <Switch>
              <Route
                exact
                path="/dashboard"
                render={props => <UserDash {...props} user={this.state.user} />}
              />
              <Route
                exact
                path="/"
                render={props => (
                  <Login
                    {...props}
                    authTokenPresent={this.state.authTokenPresent}
                    login={this.login}
                  />
                )}
              />
              <Route exact path="/signup" component={Signup} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
