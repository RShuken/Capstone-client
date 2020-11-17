import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import ApiContext from "../../ApiContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const currentUser = useContext(ApiContext).getUserAuthInfo();
  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser.accessToken ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
