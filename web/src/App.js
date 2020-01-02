import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { tokenFoundInLocalStorage } from "./utils/clientAuth";

import Header from "./components/blocks/Header";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import NotFound from "./components/pages/NotFound";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { loggedIn: tokenFoundInLocalStorage() };
  }

  render() {
    return (
      <div className="wrapper">
        <Header loggedIn={this.state.loggedIn} />
        <div className="main">
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
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
