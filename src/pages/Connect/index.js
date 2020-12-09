import React, { useContext, useState, useEffect } from 'react';
import ApiContext from '../../ApiContext';
import config from '../../config';



const Connect = () => {
  const [hasError, setErrors] = useState(false);
  const [stateConnection, setConnection] = useState([{}]);
  const { currentUser } = useContext(ApiContext);
  const { accessToken, id } = currentUser;


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
      .catch((err) => setErrors(err));
  };

  useEffect(() => {
    if (accessToken) {
      fetchConnectionRequests();
    }
  }, [accessToken]);

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
      fetchConnectionRequests();
      // insert the function for count from context
    });
    
  };

  return stateConnection.map((connection) => (
    <div key={connection.id}>
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
