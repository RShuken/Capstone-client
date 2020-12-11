import React, { useContext, useState } from 'react';
import ApiContext from '../../../ApiContext';

const Card = ({ cardUser, setOpenProfile, openProfile, createConnection }) => {
  return (
    <>
      <li className='connection_box' key={cardUser.id}>
        <h2>{cardUser.name}</h2>
        <h3>{cardUser.is_mentor ? 'MENTOR' : 'STUDENT'}</h3>
        <p>{cardUser.job_title}</p>
        <p>{cardUser.open_sessions} mentor sessions available this week</p>
        <label htmlFor='connect_btn'>
          <button
            id='connect_btn'
            onClick={() => createConnection(cardUser.id)}
          >
            {' '}
            Connect{' '}
          </button>
        </label>
        <label htmlFor='full_profile_btn'>
          <button
            onClick={() => {
              const collapse = openProfile.id === cardUser.id ? {} : cardUser;
              setOpenProfile(collapse);
            }}
            id='full_profile_btn'
          >
            {openProfile.id === cardUser.id ? 'Collapse' : 'Full Profile'}
          </button>
        </label>
      </li>
    </>
  );
};

export default Card;
