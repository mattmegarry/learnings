import React, { Component } from "react";

import { tokenFoundInLocalStorage } from "./utils/auth";

import Header from "./components/blocks/Header";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { loggedIn: tokenFoundInLocalStorage() };
  }

  render() {
    return (
      <div className="wrapper">
        <Header loggedIn={this.state.loggedIn} />
        <div className="main">
          <div>THE CONTENT</div>
        </div>
      </div>
    );
  }
}

export default App;
