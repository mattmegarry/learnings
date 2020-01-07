import React, { Component } from "react";

class SnippetsRecent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getRecentSnippets();
  }

  render() {
    const { snippets } = this.props;

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
