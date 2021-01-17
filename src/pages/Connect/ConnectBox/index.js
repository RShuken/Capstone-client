import React, { useContext, useState, useEffect } from 'react';
import ApiContext from '../../../ApiContext';
import config from '../../../config';

const ConnectBox = (props) => {
  const { connection } = props;
  const { currentUser, updateCount } = useContext(ApiContext);
  const { accessToken, id } = currentUser;
  const [isToggled, setToggled] = useState('initial');

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
        data.match_status === 'accepted' ? setToggled('accepted') : setToggled('denied');
        //fetchConnectionRequests();
    });
  };

  const connectionFeedback = () => {
    return (
      <div>
        <p>
          You have connected with {connection.name}! Since this is an early
          prototype please email the connection to schedule a meeting. Your
          connections email is: {connection.email}.
        </p>
      </div>
    );
  };

    const renderConnectionBox = () => {
        return (
    <div className='connecting-box' key={Math.random() * 10}>
      <p>Connection Request from:</p>
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
          changeConnectionStatus({
            match_status: 'denied',
            id: connection.id,
          })
        }
      >
        Dismiss
      </button>
    </div>
  )
    }
    
    const renderContent = () => {
        if (isToggled === 'initial') {
            return renderConnectionBox()
        }
        if (isToggled === 'accepted') {
            return connectionFeedback()
        }
        return (<></>);
    }

    return renderContent();
};

export default ConnectBox;
