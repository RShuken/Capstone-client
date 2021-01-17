import React, { useContext, useState, useEffect } from 'react';
import ApiContext from '../../ApiContext';
import config from '../../config';
import ConnectionBox from './ConnectBox/index';


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

 const noConnections = () => {
   return (
     <div className='noConnections'>
       <p>
         You don't have any pending connections, why not go back to the
         dashboard and add someone?
       </p>
       <button>
         <a href='/dashboard'>Dashboard</a>
       </button>
     </div>
   );
 };

  
  return stateConnection.length !== 0 ? stateConnection.map((connection) => (
    <ConnectionBox connection={connection} />
  )) : noConnections();
};

export default Connect;
