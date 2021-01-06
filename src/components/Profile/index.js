import React, { useContext, useState, useEffect } from 'react';
import Context from '../../ApiContext';
import config from '../../config';

// this is the user profile component. It helped me learn how to use hooks and useEffect. I do a fetch request based on the user id, and return the user profile data, set it to state then show it to the user. 
const UserProfile = () => {
  const [hasError, setErrors] = useState(false);
  const [stateUser, setUser] = useState({});
  const { currentUser } = useContext(Context);
  const { accessToken, id } = currentUser;

  //this hook is similar to componentDidMount and will run if the user has an access token. I use context to grab the access token as it is saved in currentUser. 
  useEffect(() => {
    if (accessToken) {
      fetch(`${config.API_ENDPOINT}/api/user_profile/profile`, {
        method: 'GET',
        headers: {
          authorization: accessToken,
          'user-id': id,
          'Content-Type': 'application/json',
        },
      })
        .then((data) => data.json())
        .then((resp) => setUser(resp))
        .catch((err) => {
          setErrors(err)
          console.log(hasError)
        });
    }
  }, [accessToken,hasError,id]);
   
  return (
    <div className='user_profile_box'>
      <h2>{stateUser.name}'s Profile</h2>
      <p>{stateUser.open_sessions} mentor sessions available this week</p>
      <p>{stateUser.job_title}</p>
      <p>at {stateUser.job_company}</p>
      <p>Located in {stateUser.location}</p>
      <p>Personal Message: {stateUser.job_description}</p>
      <label htmlFor='profile_connect_btn'>
        <button id='profile_connect_btn' className='profile_connect_btn'>
          <a href='/edit_profile'>Edit Profile</a>
        </button>
      </label>
    </div>
  );
};

export default UserProfile;
