import React, { Component } from "react";

import QuickAddSnippet from "../blocks/QuickAddSnippet";
import SnippetsRecent from "../blocks/SnippetsRecent";

import { authRequest } from "../../utils/http.utils";

class UserHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      snippets: []
    };

    this.getRecentSnippets = this.getRecentSnippets.bind(this);
  }

  getRecentSnippets() {
    const { userId } = this.props;
    if (userId) {
      authRequest(`/users/${userId}/recent-snippets`, "GET")
        .then(res => {
          if (res.status === 200) {
            this.setState({ snippets: res.data.snippets });
          }
        })
        .catch(e => console.error(e));
    }
  }

  render() {
    const userId = this.props.userId;
    const { snippets } = this.state;
    const getRecentSnippets = this.getRecentSnippets;

    return (
      <>
        <QuickAddSnippet
          userId={userId}
          getRecentSnippets={getRecentSnippets}
        />
        <SnippetsRecent
          userId={userId}
          getRecentSnippets={getRecentSnippets}
          snippets={snippets}
        />
      </>
    );
  }
}

export default UserHome;
