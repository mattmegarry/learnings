import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

import NotFound from "./NotFound";
import SnippetHome from "./SnippetHome";
import SnippetCollections from "./SnippetCollections";
import SnippetSeries from "./SnippetSeries";
import SnippetFind from "./SnippetFind";

class UserDash extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const userId = this.props.user.id;

    return (
      <div className="user-dashboard">
        <Router>
          <div className="user-dashboard-nav">
            <NavLink exact to="/" activeClassName="nav-link-selected">
              Home
            </NavLink>
            <NavLink to="/collections" activeClassName="nav-link-selected">
              Collections
            </NavLink>
            <NavLink to="/series" activeClassName="nav-link-selected">
              Series
            </NavLink>
            <NavLink to="/find" activeClassName="nav-link-selected">
              Find
            </NavLink>
          </div>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <SnippetHome {...props} userId={userId} login={this.login} />
              )}
            />
            <Route exact path="/collections" component={SnippetCollections} />
            <Route exact path="/series" component={SnippetSeries} />
            <Route exact path="/find" component={SnippetFind} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default UserDash;
