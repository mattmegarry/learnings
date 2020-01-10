import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({
  component: Component,
  authTokenPresent,
  user,
  signout,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props =>
        authTokenPresent ? (
          <Component {...props} user={user} signout={signout} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}
