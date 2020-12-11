import React, { useContext, useState } from 'react';
import Context from '../../ApiContext';
import Card from './Card';
import { useHistory } from 'react-router-dom';
import config from '../../config';

const DashboardCards = () => {
  const { users } = useContext(Context);
  const { currentUser } = useContext(Context);
  const history = useHistory();
  const { accessToken, id } = currentUser;
  const userId = currentUser.id;
  const [openProfile, setOpenProfile] = useState({});

  const createConnection = (connectionId) => {
    console.log('the connect button has been clicked, and this is the user');
    const data = {
      user_id: userId,
      connection_id: connectionId,
      match_status: 'pending',
    };
    fetch(`${config.API_ENDPOINT}/api/connections/`, {
      method: 'POST',
      headers: {
        authorization: accessToken,
        'user-id': id,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        history.push({
          pathname: '/connect_message',
          state: {
            connectionId: data.id,
            userConnectionId: connectionId,
            userId: userId,
          },
        });
      });
  };
  //this is the user card pulling from the currentUser data from login
  const CurrentUserStatus = () => (
    <div className='notice' key={currentUser.id}>
      <h2>{currentUser.name}</h2>
      <p>
        You have booked {currentUser.open_sessions} sessions out of 3 available
        this week
      </p>
    </div>
  );

  return (
    <section className='page'>
      <CurrentUserStatus />
      <div className='connection-panel'>
        <ul className='users-list'>
          {users.map((cardUser) => (
            <Card
              setOpenProfile={(profile) => {
                setOpenProfile(profile);
              }}
              createConnection={createConnection}
              openProfile={openProfile}
              cardUser={cardUser}
            />
          ))}
        </ul>
        <div className='user-profile'>
          {openProfile.id ? (
            <div className='full_profile_box'>
              <h2>{openProfile.name}'s Profile</h2>
              <p>{openProfile.job_title}</p>
              <h2>{openProfile.job_company}</h2>
              <p>Location: {openProfile.location}</p>
              <h2>{openProfile.job_description}</h2>
              <button
                id='profile_connect_btn'
                onClick={() => createConnection(openProfile.id)}
                aria-label='Click to connect with this user'
              >
                {' '}
                Connect{' '}
              </button>
              <p>1 mentor session available this week</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default DashboardCards;
