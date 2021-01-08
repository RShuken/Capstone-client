import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Router, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import Header from '../components/Header';
import Registration from '../pages/Registration';
import Login from '../pages/Login';
import HomePage from '../pages/HomePage';
import Dashboard from '../pages/Dashboard';
import PrivateRoute from '../components/PrivateRoute';
import Context from '../ApiContext';
import config from '../config';
import './App.css';
import Profile from '../pages/Profile';
import Connect from '../pages/Connect';
import EditProfile from '../pages/EditProfile';
import ConnectMessage from '../pages/ConnectMessage';

const history = createBrowserHistory();

// the main app component for my client
class App extends Component {
  //state stores the current user and public information like the mentors to match with, along with a useful helper function to get auth info for all private routes
  state = {
    currentUser: {},
    currentUsersConnections: [],
    currentUserProfile: {},
    getUserAuthInfo: () => {
      const user = JSON.parse(sessionStorage.getItem('currentUser')) || {};
      return user;
    },
    users: [],
    pendingConnectionCount: 0,
    user_profiles: [],
    user_connections: [],
  };

  //on mount check if the user is logged in by looking at local session data
  componentDidMount() {
    if (sessionStorage.getItem('currentUser')) {
      const user = JSON.parse(sessionStorage.getItem('currentUser')) || {};
      this.updateUser(user);
    }
    //fetch request to receive the public data on mentors to connect with
    Promise.all([fetch(`${config.API_ENDPOINT}/api/public`)])
      .then(([usersRes]) => {
        if (!usersRes.ok) return usersRes.json().then((e) => Promise.reject(e));
        return Promise.all([usersRes.json()]);
      })
      .then(([users]) => {
        const list = users.filter(
          (user) => user.id !== this.state.currentUser.id
        );
        this.setState({ users: list });
      })
      .catch((error) => {
        console.log(
          error.message,
          'this is the error message from app.js line 57'
        );
      });
  }
  //update user function to update state
  updateUser = (currentUser) => {
    this.setState({ currentUser: currentUser });
  };
  //updateCount checks if the user has pending connections and updates the count.
  updateCount = () => {
    fetch(`${config.API_ENDPOINT}/api/connections/count`, {
      method: 'GET',
      headers: {
        authorization: this.state.currentUser.accessToken,
        'user-id': this.state.currentUser.id,
        'Content-Type': 'application/json',
      },
    })
      .then((data) => data.json())
      .then((resp) => {
        this.setState({
          pendingConnectionCount: resp.count,
        });
      })
      .catch((err) => console.log(err));
  };
  //the pending invite count needs to update when the state changes, I do that here
  componentDidUpdate(nextProps, nextState) {
    if (
      this.state.currentUser.accessToken !== nextState.currentUser.accessToken
    ) {
      this.updateCount();
    }
  }
  //context is used to avoid prop drilling as user data and public mentor data is used in many components. Pages are routed with the react-router-dom and each page renders a component. The decision to do it this was made after talking with my mentor about production ready code, so a web designer can work on the pages, and someone else can work on the components at the same time.
  render() {
    return (
      <Context.Provider
        value={{
          updateUser: this.updateUser,
          updateCount: this.updateCount,
          ...this.state,
        }}
      >
        <Header />
        <div className='main-content'>
          <Router history={history}>
            <Switch>
              <Route exact path={'/'} component={HomePage} />
              <Route exact path={'/profile'} component={Profile} />
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
