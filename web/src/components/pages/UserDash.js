import React, { Component } from "react";
import { authRequest } from "../../utils/http.utils";
import { Redirect } from "react-router-dom";

class UserDash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      snippets: []
    };
  }

  componentDidMount() {
    const { user } = this.props;
    if (user) {
      authRequest(`/users/${user.id}/snippets`, "GET")
        .then(res => {
          if (res.status === 200) {
            this.setState({ snippets: res.data.snippets });
          }
        })
        .catch(e => console.error(e));
    }
  }

  render() {
    const { snippets } = this.state;
    const { user } = this.props;
    console.log(user);
    console.log("DASH RENDERED");

    if (!user) return <Redirect to={{ path: "/" }} />;

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
