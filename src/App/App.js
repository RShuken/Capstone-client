import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
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
import ConnectMessage from '../pages/ConnnectMessage';

const history = createBrowserHistory();

class App extends Component {
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
    addUser: () => {},
    addProfile: () => {},
    addConnection: () => {},
    deleteUser: () => {},
    deleteProfile: () => {},
    deleteConnection: () => {},
    updateProfile: () => {},
    updateConnection: () => {},
  };

  componentDidMount() {
    if (sessionStorage.getItem('currentUser')) {
      const user = JSON.parse(sessionStorage.getItem('currentUser')) || {};
      this.updateUser(user);
    }

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
        console.error({ error });
      });
  }

  updateUser = (currentUser) => {
    this.setState({ currentUser: currentUser });
  };

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

  componentDidUpdate(nextProps, nextState) {
    if (
      this.state.currentUser.accessToken !== nextState.currentUser.accessToken
    ) {
      this.updateCount();
    }
  }

  render() {
    return (
      <Context.Provider
        value={{
          updateUser: this.updateUser,
          updateCount: this.updateCount,
          ...this.state,
        }}
      >
        <div className='App'>
          <Header />
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
