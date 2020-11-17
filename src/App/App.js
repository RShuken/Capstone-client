import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { Router, Switch } from "react-router";
import { createBrowserHistory } from "history";
import Header from "../components/Header";
import Registration from "../pages/Registration";
import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
import ConnectionsDashboard from "../pages/ConnectionsDashboard";
import PrivateRoute from "../components/PrivateRoute";
import Context from "../ApiContext";
import config from "../config";
import "./App.css";

const history = createBrowserHistory();

class App extends Component {
  state = {
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
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/api/public`),
      // fetch(`${config.API_ENDPOINT}/api/connections`),
      // fetch(`${config.API_ENDPOINT}/api/user_profiles`),
    ])
      .then(([usersRes]) => {
        if (!usersRes.ok) return usersRes.json().then((e) => Promise.reject(e));
        // if (!userConnectionsRes.ok)
        //   return userConnectionsRes.json().then((e) => Promise.reject(e));
        // if (!userProfileRes.ok)
        //   return userProfileRes.json().then((e) => Promise.reject(e));
        return Promise.all([
          usersRes.json(),
          // userConnectionsRes.json(),
          // userProfileRes.json(),
        ]);
      })
      .then(([users]) => {
        this.setState({ users });
        console.log(
          "this is after the state and been updated with the users",
          this.state.users
        );
      })
      .catch((error) => {
        console.error({ error });
      });
  }

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

  render() {
    return (
      <Context.Provider value={this.state}>
        <div className="App">
          <Header />
          <Router history={history}>
            <Switch>
              <Route exact path={"/"} component={HomePage} />
              <Route
                exact
                path="/registration/:registrationType"
                component={Registration}
              />
              <Route exact path="/login" component={Login} />
              <PrivateRoute
                exact
                path="/dashboard"
                component={ConnectionsDashboard}
              />
            </Switch>
          </Router>
        </div>
      </Context.Provider>
    );
  }
}

export default App;
