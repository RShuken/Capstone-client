import React, { useContext, useState, useEffect } from 'react';
import ApiContext from '../../ApiContext';
import config from '../../config';

const Connect = () => {
  const { users, currentUser } = useContext(ApiContext);
  const [hasError, setErrors] = useState(false);
  const { userToShowMessageFieldFor, showTextAreaFor } = useState({});
  const [stateConnection, setConnection] = useState([{}]);
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
    });
  };

  console.log(stateConnection);
  return stateConnection.map((connection) => (
    <div key={connection.id}>
      {connection.name}
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
