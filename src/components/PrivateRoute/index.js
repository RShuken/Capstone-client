import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import ApiContext from "../../ApiContext";

// this is the private route component that wll redirect users to the login page if they do not have the local session token. If they do, they will pass through to the correct component, if not they go to the login page. In this case I check for a user within context instead of looking at session data. I wanted to learn all the ways I could achieve checking for a user. 
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
