import React from "react";

export default function SnippetsRecent(props) {
  const { snippets } = props;

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
