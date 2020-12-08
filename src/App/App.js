import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { Router, Switch } from "react-router";
import { createBrowserHistory } from "history";
import Header from "../components/Header";
import Registration from "../pages/Registration";
import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "../components/PrivateRoute";
import Context from "../ApiContext";
import config from "../config";
import "./App.css";
import Profile from "../pages/Profile";
import About from "../pages/About";
import Connect from "../pages/Connect";
import EditProfile from "../pages/EditProfile";
import ConnectMessage from '../pages/ConnnectMessage';

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
    updateUser: (currentUser) => {
      this.setState({ ...this.state, currentUser });
    },
    updateProfile: () => {},
    updateConnection: () => {},
  };

  componentDidMount() {
    if (sessionStorage.getItem("currentUser")) {
      const user = JSON.parse(sessionStorage.getItem("currentUser")) || {};
      this.state.updateUser(user);
    }

    Promise.all([fetch(`${config.API_ENDPOINT}/api/public`)])
      .then(([usersRes]) => {
        if (!usersRes.ok) return usersRes.json().then((e) => Promise.reject(e));
        return Promise.all([usersRes.json()]);
      })
      .then(([users]) => {
        this.setState({ users });
      })
      .catch((error) => {
        console.error({ error });
      });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        <div className='App'>
          <Header />
          <Router history={history}>
            <Switch>
              <Route exact path={'/'} component={HomePage} />
              <Route exact path={'/profile'} component={Profile} />
              <Route exact path={'/about'} component={About} />
              <Route exact path={'/connect'} component={Connect} />
              <Route exact path={'/edit_profile'} component={EditProfile} />
              <Route
                exact
                path={'/connect_message'}
                component={ConnectMessage}
              />
              <Route
                exact
                path='/registration/:registrationType'
                component={Registration}
              />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
            </Switch>
          </Router>
        </div>
      </Context.Provider>
    );
  }
}

export default App;
