import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import config from '../../config';
import ApiContext from '../../ApiContext';

// this component is the registration component. Depending on what button the user pressed, either to be a mentor or find a mentor, the default value of is_mentor is true or false. The registration request is a POST call to the server and once done it redirects the user to the dashboard page.
function Registration() {
  const { registrationType } = useParams();
  const appContext = useContext(ApiContext);
  const [formValues, setFormValues] = useState({});
  const [error, setFormError] = useState({});

  const doRegistration = (e) => {
    e.preventDefault();
    const data = { ...formValues, is_mentor: registrationType === 'mentor' };
    fetch(`${config.API_ENDPOINT}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(async (resp) => {
        if (resp.status >= 400 && resp.status < 600) {
          return resp.json().then(Promise.reject.bind(Promise));
        }
        return resp.json();
      })
      .then(() => {
        delete data.password;
        window.sessionStorage.setItem('currentUser', JSON.stringify(data));
        appContext.currentUser = data;
        window.location.href = '/dashboard';
      })
      .catch((error) => {
        setFormError(error);
      });
  };
  // this is the input onchange function that sets the state to the values of the inputs
  const onFormValueChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  return (
    <>
      <form className='connectful-form' onSubmit={doRegistration}>
        <h2>Register</h2>
        <div className='connectful-formcontrol'>
          <label htmlFor='name'>Username</label>
          <input
            required
            onChange={onFormValueChange}
            placeholder='John Doe'
            name='name'
            id='name'
            type='text'
          />
        </div>
        <label htmlFor='email'>Email</label>
        <input
          required
          onChange={onFormValueChange}
          placeholder='john.doe@gmail.com'
          name='email'
          type='email'
          id='email'
        />
        <label htmlFor='password'>Password</label>
        <input
          required
          onChange={onFormValueChange}
          placeholder='super secret password'
          name='password'
          type='password'
          id='password'
        />
        <label htmlFor='open_sessions'>
          <select
            required
            onChange={onFormValueChange}
            name='open_sessions'
            id='open_sessions'
          >
            <option value={1}>Available for 1 session a week</option>
            <option value={2}>Available for 2 session a week</option>
            <option value={3}>Available for 3 session a week</option>
          </select>
        </label>
        <div className='action-buttons'>
          <label htmlFor='register'>
            <button type='submit' id='register'>
              Register
            </button>
          </label>
        </div>
      </form>
      {error.msg && <div>{error.msg}</div>}
    </>
  );
}

export default Registration;
