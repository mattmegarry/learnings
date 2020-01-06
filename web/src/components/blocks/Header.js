import React from "react";

function Header(props) {
  const user = props.user;
  const signout = props.signout;

  return (
    <>
      {user ? (
        <div className="header-wrapper">
          <div className="container">
            <div className="header header-user">
              <div className="logo logo-user">learnings.me</div>
              <div>
                <div className="user-info">Hi, {user.username}!</div>
                <button onClick={signout}>Signout</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="header-wrapper">
          <div className="container">
            <div className="header header-public">
              <div className="inner">
                <div className="logo logo-public">learnings.me</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
