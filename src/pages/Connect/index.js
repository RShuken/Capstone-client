import React, { useContext, useState, useEffect } from 'react';
import ApiContext from '../../ApiContext';
import config from '../../config';


// this component was my first attempt at learning hooks in react. It handles the list of pending connections for the user. It has a get request to recieve all pending connections, then it has a patch to update the connection status to 'accepted' or 'denied' depending on which button is clicked. 
const Connect = () => {
  const [stateConnection, setConnection] = useState([{}]);
  const { currentUser, updateCount } = useContext(ApiContext);
  const { accessToken, id } = currentUser;
  // this is the get request that returns the list of connections for the user. It only runs if the access token is found when the component mounts.
  const fetchConnectionRequests = () => {
    fetch(`${config.API_ENDPOINT}/api/connections`, {
      method: 'GET',
      headers: {
        authorization: accessToken,
        'user-id': id,
        'Content-Type': 'application/json',
      },
    })
      .then((data) => data.json())
      .then((resp) => setConnection(resp))
      .catch((err) => console.error(err));
  };
  // This is the first time I learned how to use useEffect, here it will check if the accessToken in present then do the fetch request. 
  useEffect(() => {
    if (accessToken) {
      fetchConnectionRequests();
    }
  }, [accessToken]);
  // this is the patch request for changing the match_status of the connection.
  const changeConnectionStatus = (data) => {
    fetch(`${config.API_ENDPOINT}/api/connections/${data.id}`, {
      method: 'PATCH',
      headers: {
        authorization: accessToken,
        'user-id': id,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(() => {
      updateCount();
      fetchConnectionRequests();
    });
  };

  return stateConnection.map((connection) => (
    <div className='connecting-box' key={connection.id}>
      <p>{connection.name}</p>
      <p>{connection.connection_message}</p>
      <button
        onClick={() =>
          changeConnectionStatus({
            match_status: 'accepted',
            id: connection.id,
          })
        }
      >
        Connect
      </button>
      <button
        onClick={() =>
          changeConnectionStatus({ match_status: 'denied', id: connection.id })
        }
      >
        Dismiss
      </button>
    </div>
  ));
};

export default Connect;
