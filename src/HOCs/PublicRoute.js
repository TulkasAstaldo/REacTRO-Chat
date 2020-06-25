import React from "react";
import { Redirect, Route } from "react-router-dom";

const PublicRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === false ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PublicRoute;
