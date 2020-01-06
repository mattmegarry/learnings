import React, { Component } from "react";

import { authRequest } from "../../utils/http.utils";

class QuickAddSnippet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionText: "",
      snippetText: "",
      successMessage: null,
      errorMessage: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;

    this.setState({
      [name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const body = {
      questionText: this.state.questionText,
      snippetText: this.state.snippetText
    };

    authRequest("/snippets/" + this.props.userId, "POST", body)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            successMessage: "Saved!",
            questionText: "",
            snippetText: ""
          });

          this.props.getRecentSnippets();
          setTimeout(() => this.setState({ successMessage: null }), 200);
        } else if (res.status === 400 || res.status === 500) {
          this.setState({ errorMessage: res.data });
        }
      })
      .catch(e => console.error(e));
  }

  render() {
    const { successMessage, errorMessage } = this.state;

    const message = successMessage || errorMessage;

    return (
      <div>
        <fieldset className="quick-add-fieldset">
          <legend>Quick Add</legend>
          <form className="quick-add-form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="questionText"
              value={this.state.questionText}
              onChange={this.handleChange}
              placeholder="Question"
            />
            <input
              type="text"
              name="snippetText"
              value={this.state.snippetText}
              onChange={this.handleChange}
              placeholder="Snippet"
            />
            <div>{message}</div>
            <input type="submit" value="Submit" />
          </form>
        </fieldset>
      </div>
    );
  }
}

export default QuickAddSnippet;
