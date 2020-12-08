import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import config from '../../../config';
import ApiContext from '../../../ApiContext';



const Card = ({ stateUsers }) => {
  const [stateToggled, setToggled] = useState(false);
  const history = useHistory();
  const { currentUser } = useContext(ApiContext);
  const { accessToken, id } = currentUser;
  const userId = currentUser.id;
 


  const createConnection = (connectionId) => {
    console.log(
      'the connect button has been clicked, and this is the user'
    );
    const data = { user_id: userId, connection_id: connectionId, match_status: 'pending' };
    fetch(`${config.API_ENDPOINT}/api/connections/`, {
      method: 'POST',
      headers: {
        authorization: accessToken,
        'user-id': id,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => res.json())
      .then((data) => {
      history.push({
        pathname: '/connect_message',
        state: { connectionId: data.id, userConnectionId: connectionId, userId: userId },
      });
    });
  };

  return (
    <>
      <div className='connection_box' key={stateUsers.id}>
        <h2>{stateUsers.name}</h2>
        <h3>{stateUsers.is_mentor ? 'MENTOR' : 'STUDENT'}</h3>
        <p>{stateUsers.job_title}</p>
        <p>{stateUsers.open_sessions} mentor sessions available this week</p>
        <label htmlFor='connect_btn'>
          <button id='connect_btn' onClick={() => createConnection(stateUsers.id)}> Connect </button>
        </label>
        <label htmlFor='full_profile_btn'>
          <button
            onClick={() => setToggled(!stateToggled)}
            id='full_profile_btn'
          >
            {stateToggled ? 'Collapse' : 'Full Profile'}
          </button>
        </label>
      </div>
      {stateToggled ? (
        <div className='full_profile_box'>
          <h2>{stateUsers.name}'s Profile</h2>
          <p>{stateUsers.job_title}</p>
          <h2>{stateUsers.job_company}</h2>
          <p>Location: {stateUsers.location}</p>
          <h2>{stateUsers.job_description}</h2>
          <label htmlFor='profile_connect_btn'>
            <button id='profile_connect_btn' className='profile_connect_btn'>
              <a href='/connect_message'>Connect</a>
            </button>
          </label>
          <p>1 mentor session available this week</p>
        </div>
      ) : null}
    </>
  );
};

export default Card;


// onClick={() => history.push({pathname:'/connect_message', state: {userId: stateUsers.id}})}