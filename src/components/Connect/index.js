import React, { useState, useContext } from 'react';
import Context from '../../ApiContext';
import { useLocation, useHistory } from 'react-router-dom';
import config from '../../config';

function UserConnect() {
  const location = useLocation();
  const history = useHistory();
  const connectionId = location.state.connectionId;
  const userConnectionId = location.state.userConnectionId;
  const [connectionMessage, setConnectionMessage] = useState({});
  const userId = location.state.userId;
  const { currentUser } = useContext(Context);
  const { accessToken } = currentUser;

  console.log(location);

  const testConnectWithUser = (user) => {
    console.log('Me', userId);
    console.log("I'm trying to connect with", userConnectionId);
    console.log('the id of the connection row is', connectionId);
  };

  const onMessageValueChange = (e) => {
    setConnectionMessage({
      ...connectionMessage,
      [e.target.name]: e.target.value,
    });
  };

  const connectWithUser = (id = connectionId) => {
    const data = {
      id: connectionId,
      connection_message: connectionMessage,
    };
    fetch(`${config.API_ENDPOINT}/api/connections/`, {
      method: 'PATCH',
      headers: {
        authorization: accessToken,
        'user-id': id,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(() => {
      window.location.href = '/dashboard';
    });

  };

  return (
    <div className='connection_message_box'>
      <label for='connection_message'>
        Write a short message for the user you want to connect with
        <textarea name='connection_message' onChange={onMessageValueChange} />
      </label>
      <button onClick={() => connectWithUser()}>Send Message</button>
    </div>
  );
}

export default UserConnect;
