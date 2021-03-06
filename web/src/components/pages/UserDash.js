import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect
} from "react-router-dom";

import NotFound from "./NotFound";
import SnippetHome from "./SnippetHome";
import Collections from "./Collections";
import Collection from "./Collection";
import SnippetSeries from "./SnippetSeries";
import SnippetFind from "./SnippetFind";

class UserDash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usernameMatchesUsernameParam: false
    };
  }

  componentDidMount() {
    const { username } = this.props.user;
    const { usernameParam } = this.props.match.params;

    if (username === usernameParam) {
      this.setState({ usernameMatchesUsernameParam: true });
    }
  }

  render() {
    const {
      user,
      user: { username: username },
      signout
    } = this.props;

    return (
      <div className="user-dashboard">
        <Router>
          <div className="user-dashboard-nav">
            <NavLink
              exact
              to={`/${username}`}
              activeClassName="nav-link-selected"
            >
              Home
            </NavLink>
            <NavLink
              to={`/${username}/collections`}
              activeClassName="nav-link-selected"
            >
              Collections
            </NavLink>
            <NavLink
              to={`/${username}/series`}
              activeClassName="nav-link-selected"
            >
              Series
            </NavLink>
            <NavLink
              to={`/${username}/find`}
              activeClassName="nav-link-selected"
            >
              Find
            </NavLink>
          </div>
          <Switch>
            <Route
              exact
              path="/:username"
              render={props => (
                <SnippetHome {...props} user={user} signout={signout} />
              )}
            />
            <Route
              exact
              strict
              path="/:username/collections"
              render={props => (
                <Collections {...props} user={user} signout={signout} />
              )}
            />
            <Route
              exact
              path="/:username/collections/:collectionId"
              render={props => (
                <Collection {...props} user={user} signout={signout} />
              )}
            />
            <Route
              exact
              path="/:username/series"
              component={SnippetSeries}
              signout={signout}
            />
            <Route
              exact
              path="/:username/find"
              component={SnippetFind}
              signout={signout}
            />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default UserDash;
