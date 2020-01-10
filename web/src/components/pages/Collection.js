import React from "react";

export default function Collection(props) {
  return (
    <p>
      The id is {props.match.params.collectionId} This is where you'll view and
      manage one collection!
    </p>
  );
}
