import React, { Component } from "react";

import CollectionsResults from "../blocks/CollectionsResults";
import FindCollections from "../blocks/FindCollections";

import { authRequest } from "../../utils/http.utils";

class Collections extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collections: []
    };

    this.getCollections = this.getCollections.bind(this);
  }

  componentDidMount() {
    this.getCollections("recent-collections", "GET");
  }

  getCollections(resource, method, body) {
    const { id: userId } = this.props.user;
    if (userId) {
      authRequest(`/collections/${userId}/${resource}`, method, body)
        .then(res => {
          if (res.status === 200) {
            console.log(res.data);
            this.setState({ collections: res.data.collections });
          } else if (res.status === 401) {
            this.props.signout();
          }
        })
        .catch(e => console.error(e));
    }
  }

  render() {
    const { id: userId, username } = this.props.user;
    const { collections } = this.state;
    const getCollections = this.getCollections;

    return (
      <>
        <FindCollections getCollections={this.getCollections} />
        <CollectionsResults collections={collections} />
      </>
    );
  }
}

export default Collections;
