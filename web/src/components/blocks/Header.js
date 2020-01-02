import React from "react";

function Header(props) {
  const user = props.user;

  return (
    <>
      {user.id ? (
        <div className="header header-user">
          <div className="logo logo-user">learnings.me</div>
          <div className="user-info">Hi, {user.username}!</div>
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
