import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function CollectionsResults(props) {
  const location = useLocation();
  const { collections } = props;

  const collectionListItems = collections.map(collection => (
    <Link key={collection.id} to={`${location.pathname}/${collection.id}`}>
      <li className="collection-list-item hyphenate">
        {collection.collectionName}
      </li>
    </Link>
  ));

  return (
    <>
      <h2>Recently Created Collections</h2>
      <ul>{collectionListItems}</ul>
    </>
  );
}
