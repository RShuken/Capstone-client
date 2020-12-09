import React, { useContext, useState, useEffect } from 'react';
import ApiContext from '../../ApiContext';
import config from '../../config';



function Header() {
  const currentUser = useContext(ApiContext).getUserAuthInfo();
  const [count, setCount] = useState([{}]);
  const { accessToken, id } = currentUser;
  const [hasError, setErrors] = useState(false);

  const fetchCountConnectionRequests = () => {
    fetch(`${config.API_ENDPOINT}/api/connections/count`, {
      method: 'GET',
      headers: {
        authorization: accessToken,
        'user-id': id,
        'Content-Type': 'application/json',
      },
    })
      .then((data) => data.json())
      .then((resp) => {
        setCount(resp);
      })
      .catch((err) => setErrors(err));
  };

  useEffect(() => {
    if (accessToken) {
      fetchCountConnectionRequests();
    }
  }, [accessToken]);

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

  const PrivateOptions = () => {
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

    console.log('this is the count', count[0].count)

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
            {/* go back and fix this, it would also be good if you have no more connections to forward you to the dashboard page */}
            {count[0].count !== 0
              ? `Pending Request : ${count[0].count}`
              : 'No Pending Connections'}
          </a>
        </li>
        <li>
          <button onClick={signMeOut}>Logout</button>
        </li>
      </>
    );
  };


  return (
    <header className='navbar'>
      <a className='navbar-brand' href='/'>
        Connectful
      </a>
      <ul>
        {currentUser.accessToken ? <PrivateOptions /> : <PublicOptions />}
      </ul>
    </header>
  );
}

export default Header;
