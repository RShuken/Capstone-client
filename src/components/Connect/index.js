import React, { useState, useContext } from 'react';
import Context from '../../ApiContext';
import { useLocation } from 'react-router-dom';
import config from '../../config';

// in this component I use hooks and I use useLocation, this is me experimenting with new ways to access data that I need with react, even though we were not taught how to use hooks or location yet. I know it's a bit messy but it has been useful for learning. 
function UserConnect() {
  const location = useLocation();
  const connectionId = location.state.connectionId;
  const [connectionMessage, setConnectionMessage] = useState({});
  const { currentUser } = useContext(Context);
  const { accessToken } = currentUser;

  // this is the onChange function that sets the state equal to the input. I use the input name as the key for each input and add that to the state.
  const onMessageValueChange = (e) => {
    setConnectionMessage({
      ...connectionMessage,
      [e.target.name]: e.target.value,
    });
  };

  // this is the function that handles connecting with users, it passes the ID of the connection and the id of the user as well as the connection message to a patch call. I wanted to emulate how linked in does the connection but now I realize I could have stored the connection data from the previous dashboard component and then in one simple POST request send the whole connection. Yet this method taught me more about Patch and was a good learning experience. I also push the user to a new path at the end of the function. 
  const connectWithUser = (id = connectionId) => {
    const message = connectionMessage.connection_message
    const data = {
      id: connectionId,
      connection_message: message,
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
      <label for='connection_message'>Write a short message for the user you want to connect with</label>
        <textarea name='connection_message' onChange={onMessageValueChange} />
      <button onClick={() => connectWithUser()}>Send Message</button>
    </div>
  );
}

export default UserConnect;
