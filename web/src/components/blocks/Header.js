import React from "react";

function Header(props) {
  const loggedIn = props.loggedIn;

  return (
    <>
      {loggedIn ? (
        <div className="header header-user">
          <div className="logo logo-user">learnings.me</div>
          <div className="user-info">USER INFO!</div>
        </div>
      ) : (
        <div className="header header-public">
          <div className="logo logo-public">learnings.me</div>
        </div>
      )}
    </>
  );
}

export default Header;
