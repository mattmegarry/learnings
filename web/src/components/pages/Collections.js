import React, { Component } from "react";

import CollectionsResults from "../blocks/CollectionsResults";
import FindCollectionsOrCreateOne from "../blocks/FindCollectionsOrCreateOne";

import { authRequest } from "../../utils/http.utils";

class Collections extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collections: []
    };

    this.getCollectionsOrCreateOne = this.getCollectionsOrCreateOne.bind(this);
  }

  componentDidMount() {
    this.getCollectionsOrCreateOne("recent-collections", "GET");
  }

  getCollectionsOrCreateOne(resource, method, body) {
    const { id: userId } = this.props.user;
    if (userId) {
      authRequest(`/collections/${userId}/${resource}`, method, body)
        .then(res => {
          if (res.status === 200 && !res.data.message) {
            console.log(res.data);
            console.log("Hee hoooooooo");
            this.setState({ collections: res.data.collections });
          } else if (
            res.status === 200 &&
            res.data.message === "Collection Saved"
          ) {
            console.log("This happened!");
            this.getCollectionsOrCreateOne("recent-collections", "GET");
          } else if (res.status === 401) {
            this.props.signout();
          }
        })
        .catch(e => console.error(e));
    }
  }

  render() {
    const { collections } = this.state;
    const { getCollectionsOrCreateOne } = this;

    return (
      <>
        <FindCollectionsOrCreateOne
          getCollectionsOrCreateOne={getCollectionsOrCreateOne}
        />
        <CollectionsResults collections={collections} />
      </>
    );
  }
}

export default Collections;
