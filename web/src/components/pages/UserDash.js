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
      console.log("they match!");
    }

    console.log("Mounted!");
  }

  render() {
    const {
      user,
      user: { username: username }
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
              render={props => <SnippetHome {...props} user={user} />}
            />
            <Route
              exact
              path="/:username/collections"
              render={props => <Collections {...props} user={user} />}
            />
            <Route exact path="/:username/series" component={SnippetSeries} />
            <Route exact path="/:username/find" component={SnippetFind} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default UserDash;
