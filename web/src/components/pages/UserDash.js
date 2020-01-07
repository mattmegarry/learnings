import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NotFound from "./NotFound";
import UserHome from "./UserHome";
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
        <p>LINKS TO PLACES GO HERE</p>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <UserHome {...props} userId={userId} login={this.login} />
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
