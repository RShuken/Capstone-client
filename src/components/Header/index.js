import React, { useContext } from 'react';
import ApiContext from '../../ApiContext';

const PublicOptions = () => (
  <>
    <li>
      <a href='/registration/student'>Find a Mentor</a>
    </li>
    <li>
      <a href='/registration/mentor'>Become a Mentor</a>
    </li>
    <li>
      <a href='/login'>Login</a>
    </li>
  </>
);

const PrivateOptions = ({ pendingConnectionCount }) => {
  // this is the logout function, it calls the api logout which deletes the user key then it removes it from sessionStorage
  const signMeOut = () => {
    fetch('/logout')
      .then((response) => {
        response.json();
      })
      .then(() => {
        sessionStorage.setItem('currentUser', JSON.stringify({}));
        window.location.href = '/';
      });
  };

  return (
    <>
      <li>
        <a href='/profile'>Profile</a>
      </li>
      <li>
        <a href='/dashboard'>Dashboard</a>
      </li>
      <li>
        <a href='/connect'>
          {pendingConnectionCount
            ? `Pending Request : ${pendingConnectionCount}`
            : 'No Pending Connections'}
        </a>
      </li>
      <li>
        <button className='btn-light' onClick={signMeOut}>
          Logout
        </button>
      </li>
    </>
  );
};

const Header = () => {
  const { currentUser, pendingConnectionCount } = useContext(ApiContext);
  return (
    <header className='navbar'>
      <a className='navbar-brand' href='/'>
        Connectful
      </a>
      <ul>
        {currentUser.accessToken ? (
          <PrivateOptions pendingConnectionCount={pendingConnectionCount} />
        ) : (
          <PublicOptions />
        )}
      </ul>
    </header>
  );
};

export default Header;
