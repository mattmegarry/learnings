import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({
  component: Component,
  authTokenPresent,
  user,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props =>
        authTokenPresent ? (
          <Component {...props} user={user} />
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
