import React, { Component } from "react";

class FindCollectionsOrCreateOne extends Component {
  constructor(props) {
    super(props);

    this.searchInput = React.createRef();
    this.createInput = React.createRef();

    this.state = {
      searchTerm: "",
      newCollectionName: "",
      findMode: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCreateCollectionSubmit = this.handleCreateCollectionSubmit.bind(
      this
    );
    this.shouldMakeSearchRequest = this.shouldMakeSearchRequest.bind(this);
    this.handleKeyboardEvents = this.handleKeyboardEvents.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyboardEvents, false);
    this.focusInput(this.searchInput);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyboardEvents, false);
  }

  handleChange(event) {
    const name = event.target.name;

    this.setState({
      [name]: event.target.value
    });

    if (name === "searchTerm") {
      if (this.shouldMakeSearchRequest(event.target.value)) {
        const body = {
          searchTerm: this.state.searchTerm
        };
        this.props.getCollectionsOrCreateOne("collection-search", "POST", body);
      }
      if (event.target.value === "") {
        this.props.getCollectionsOrCreateOne("recent-collections", "GET");
      }
    }
  }

  handleCreateCollectionSubmit(event) {
    event.preventDefault();

    const body = {
      collectionName: this.state.newCollectionName
    };

    this.props.getCollectionsOrCreateOne("", "POST", body);
    this.setState({ newCollectionName: "" });
  }

  shouldMakeSearchRequest(searchTerm) {
    if (searchTerm.endsWith(" ")) {
      return true;
    }
    return false;
  }

  handleKeyboardEvents(event) {
    if (
      (event.ctrlKey && event.key === "ArrowUp") ||
      (event.ctrlKey && event.key === "ArrowDown")
    ) {
      this.state.findMode
        ? setTimeout(() => this.focusInput(this.searchInput), 100)
        : setTimeout(() => this.focusInput(this.createInput), 100);

      this.setState(prevState => ({
        findMode: !prevState.findMode
      }));
    }
  }

  focusInput(inputRef) {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  render() {
    const { findMode } = this.state;

    return (
      <fieldset className="find-create-collections-fieldset">
        <legend>{findMode ? "Search" : "Create"}</legend>
        <form
          className="find-create-collections-form"
          onSubmit={this.handleCreateCollectionSubmit}
        >
          {findMode ? (
            <input
              className="find-create-collections-input"
              name="searchTerm"
              value={this.state.searchTerm}
              onChange={this.handleChange}
              ref={this.searchInput}
              autoComplete="off"
            />
          ) : (
            <input
              className="find-create-collections-input"
              name="newCollectionName"
              value={this.state.newCollectionName}
              onChange={this.handleChange}
              ref={this.createInput}
              autoComplete="off"
            />
          )}
        </form>
      </fieldset>
    );
  }
}

export default FindCollectionsOrCreateOne;
