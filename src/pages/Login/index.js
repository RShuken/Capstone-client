import React, { useContext, useState } from 'react';
import ApiContext from '../../ApiContext';
import config from '../../config';

// this is the logic for login. I used hooks along with a post request for user login to the server. It also uses context to set the user in state that is used throughout the app.
function Login() {
  const appContext = useContext(ApiContext);
  const [formValues, setFormValues] = useState({});
  const tryLogin = (e) => {
    e.preventDefault();
    const data = { ...formValues };
    fetch(`${config.API_ENDPOINT}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => {
        delete data.password;
        window.sessionStorage.setItem('currentUser', JSON.stringify(data));
        appContext.updateUser(data);
        window.location.href = '/dashboard';
      })
      .catch((err) =>
        console.log(err.message, 'this is the login error message')
      );
  };
  // this is the on change function that takes the name of each input and sets it into state.
  const onFormValueChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  return (
    <form className='connectful-form' onSubmit={(e) => tryLogin(e)}>
      <h2>Login to Connectful</h2>
      <div className='connectful-formcontrol'>
        <label htmlFor='email'>Email</label>
        <input
          required
          onChange={onFormValueChange}
          placeholder='john.doe@gmail.com'
          name='email'
          type='email'
          id='email'
        />
      </div>
      <div className='connectful-formcontrol'>
        <label htmlFor='password'>Password</label>
        <input
          required
          onChange={onFormValueChange}
          placeholder='super secret password'
          name='password'
          type='password'
          id='password'
        />
      </div>
      <div className='action-buttons'>
        <label htmlFor='submit'>
          <button id='submit' type='submit'>
            Login
          </button>
        </label>
      </div>
    </form>
  );
}

export default Login;
