import React, { Component } from "react";

import { authRequest } from "../../utils/http.utils";

class SnippetsRecent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      snippets: [],
      refreshSnippets: false
    };

    this.getRecentSnippets = this.getRecentSnippets.bind(this);
  }

  componentDidMount() {
    this.getRecentSnippets();
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
    const { snippets, refreshSnippets } = this.state;

    if (refreshSnippets) {
      this.getRecentSnippets();
    }

    const snippetListItems = snippets.map(snippet => (
      <li key={snippet.id} className="snippet hyphenate">
        {snippet.snippetText}
      </li>
    ));
    return (
      <>
        <h2>Recent Snippets</h2>
        <ul>{snippetListItems}</ul>
      </>
    );
  }
}

export default SnippetsRecent;
