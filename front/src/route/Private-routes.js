import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../utile";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
    
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect from="admin" to="/" />
      }
    />
  );
};
export default PrivateRoute;
