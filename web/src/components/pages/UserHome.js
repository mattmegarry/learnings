import React, { Component } from "react";

import QuickAddSnippet from "../blocks/QuickAddSnippet";
import SnippetsRecent from "../blocks/SnippetsRecent";

class UserHome extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const userId = this.props.userId;

    return (
      <>
        <QuickAddSnippet
          userId={userId}
          getRecentSnippets={this.getRecentSnippets}
        />
        <SnippetsRecent userId={userId} />
      </>
    );
  }
}

export default UserHome;
