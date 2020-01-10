import React, { Component } from "react";

import { authRequest } from "../../utils/http.utils";

class FindCollections extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
      collectionsFetched: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.shouldMakeRequest = this.shouldMakeRequest.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;

    this.setState({
      [name]: event.target.value
    });

    if (this.shouldMakeRequest(event.target.value)) {
      const body = {
        searchTerm: this.state.searchTerm
      };
      this.props.getCollections("collection-search", "POST", body);
    }
    if (event.target.value === "") {
      this.props.getCollections("recent-collections", "GET");
    }
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  shouldMakeRequest(searchTerm) {
    if (searchTerm.endsWith(" ")) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <fieldset className="find-collections-fieldset">
        <legend>Search</legend>
        <form className="find-collections-form" onSubmit={this.handleSubmit}>
          <input
            className="find-collections-input"
            name="searchTerm"
            value={this.state.searchTerm}
            onChange={this.handleChange}
          />
          {/* <div>{successMessage}</div>
          <div className="user-errors">{errorMessage}</div>
          <input
            className="find-collections-submit find-collections-item"
            type="submit"
            value="Submit"
          /> */}
        </form>
      </fieldset>
    );
  }
}

export default FindCollections;
