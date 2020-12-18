import React from "react";

// in this example I use context as a copy of the state, so when state updates, context updates. I know now why this is useful and why it's not ideal for how I use it in this scenario.
const Context = React.createContext({});

export default Context;






























// import React, { createContext } from "react";

// export default React.createContext({
//   currentUser: {},
//   currentUsersConnections: [],
//   currentUserProfile: {},
//   getUserAuthInfo: () => {
//     const user = JSON.parse(sessionStorage.getItem("currentUser")) || {};
//     return user;
//   },
//   users: [],
//   user_profiles: [],
//   user_connections: [],
//   addUser: () => {},
//   addProfile: () => {},
//   addConnection: () => {},
//   deleteUser: () => {},
//   deleteProfile: () => {},
//   deleteConnection: () => {},
//   updateUser: () => {},
//   updateProfile: () => {},
//   updateConnection: () => {},
// });



  // handleAddUser = (user) => {
  //   this.setState({
  //     users: [...this.state.users, user],
  //   });
  // };

  // handleAddUserProfile = (profile) => {
  //   this.setState({
  //     userProfiles: [...this.state.userProfiles, profile],
  //   });
  // };

  // handleAddConnections = (connection) => {
  //   this.setState({
  //     userConnections: [...this.state.userConnections, connection],
  //   });
  // };

  // handleDeleteUser = (userId) => {
  //   this.setState({
  //     notes: this.state.users.filter((user) => user.id !== userId),
  //   });
  // };

  // handleDeleteUserProfile = (userId) => {
  //   this.setState({
  //     notes: this.state.userProfiles.filter((profile) => profile.id !== userId),
  //   });
  // };

  // handleDeleteUserConnection = (connectionId) => {
  //   this.setState({
  //     notes: this.state.userConnection.filter(
  //       (connection) => connection.id !== connectionId
  //     ),
  //   });
  // };