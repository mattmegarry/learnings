import React, { Component } from "react";
import { authRequest } from "../../utils/http";

class UserDash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      snippets: []
    };
  }

  componentDidMount() {
    authRequest(`/users/${this.props.user.id}/snippets`, "GET")
      .then(res => {
        if (res.status === 200) {
          this.setState({ snippets: res.data.snippets });
        }
      })
      .catch(e => console.error(e));
  }

  render() {
    const { snippets } = this.state;

    const snippetListItems = snippets.map(snippet => (
      <li key={snippet.id} className="snippet">
        {snippet.snippetText}
      </li>
    ));

    return (
      <div>
        <h2>Recent Snippets</h2>
        <ul>{snippetListItems}</ul>
      </div>
    );
  }
}

export default UserDash;
