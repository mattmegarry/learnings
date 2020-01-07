import React, { Component } from "react";
import { authRequest } from "../../utils/http.utils";

class QuickAddSnippet extends Component {
  constructor(props) {
    super(props);

    this.questionInput = React.createRef();
    this.snippetInput = React.createRef();

    this.state = {
      questionText: "",
      snippetText: "",
      successMessage: null,
      errorMessage: null,
      showQuestionInput: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyboardEvents = this.handleKeyboardEvents.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyboardEvents, false);
    this.focusInput(this.snippetInput);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyboardEvents, false);
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
          this.resetMessages();
        } else if (res.status === 400 || res.status === 500) {
          this.setState({ errorMessage: res.data });
          this.resetMessages();
        }
      })
      .catch(e => console.error(e));
  }

  resetMessages() {
    setTimeout(
      () => this.setState({ successMessage: null, errorMessage: null }),
      300
    );
  }

  handleKeyboardEvents(event) {
    if (event.ctrlKey && event.key === "Enter") {
      this.handleSubmit(event);
    }

    if (event.ctrlKey && event.key === "ArrowUp") {
      this.state.showQuestionInput
        ? this.focusInput(this.snippetInput)
        : setTimeout(() => this.focusInput(this.questionInput), 100);

      this.setState(prevState => ({
        showQuestionInput: !prevState.showQuestionInput
      }));
    }
  }

  focusInput(inputRef) {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  render() {
    const { successMessage, errorMessage, showQuestionInput } = this.state;

    return (
      <div>
        <fieldset className="quick-add-fieldset">
          <legend>Quick Add</legend>
          <form className="quick-add-form" onSubmit={this.handleSubmit}>
            <input
              className={`question-input quick-add-item${
                showQuestionInput ? "" : " hidden"
              }`}
              type="text"
              name="questionText"
              value={this.state.questionText}
              onChange={this.handleChange}
              placeholder="Question"
              autoComplete="off"
              ref={this.questionInput}
            />
            <textarea
              className="snippet-textarea quick-add-item"
              name="snippetText"
              value={this.state.snippetText}
              onChange={this.handleChange}
              ref={this.snippetInput}
            />
            <div>{successMessage}</div>
            <div className="user-errors">{errorMessage}</div>
            <input
              className="quick-add-submit quick-add-item"
              type="submit"
              value="Submit"
            />
          </form>
        </fieldset>
      </div>
    );
  }
}

export default QuickAddSnippet;
