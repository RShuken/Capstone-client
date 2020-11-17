import React, { createContext } from "react";

export default React.createContext({
  currentUser: {},
  currentUsersConnections: [],
  currentUserProfile: {},
  getUserAuthInfo: () => {
    const user = JSON.parse(sessionStorage.getItem("currentUser")) || {};
    return user;
  },
  users: [],
  user_profiles: [],
  user_connections: [],
  addUser: () => {},
  addProfile: () => {},
  addConnection: () => {},
  deleteUser: () => {},
  deleteProfile: () => {},
  deleteConnection: () => {},
  updateUser: () => {},
  updateProfile: () => {},
  updateConnection: () => {},
});


// import React from "react";

// const Context = React.createContext({
//   // users: [],
//   // cart: [],
//   // treatments: [],
//   // addUser: () => {},
//   // addCart: () => {},
//   //   getAllTreatments: () => {},
// });

// export default Context;