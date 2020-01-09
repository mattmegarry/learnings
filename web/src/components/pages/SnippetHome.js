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

  componentDidMount() {
    this.getRecentSnippets();
  }

  getRecentSnippets() {
    const userId = this.props.user.id;
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
    const { id: userId } = this.props.user;
    const { snippets } = this.state;
    const getRecentSnippets = this.getRecentSnippets;

    return (
      <>
        <QuickAddSnippet
          userId={userId}
          getRecentSnippets={getRecentSnippets}
        />
        <SnippetsRecent snippets={snippets} />
      </>
    );
  }
}

export default UserHome;
