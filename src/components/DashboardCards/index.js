import React, { useContext, useState, useEffect } from "react";
import Context from "../../ApiContext";
import config from "../../config";
import Card from "./Card";

const DashboardCards = () => {
  const [hasError, setErrors] = useState(false);
  const [stateUsers, setUsers] = useState({});

  async function fetchData() {
    const res = await fetch(`${config.API_ENDPOINT}/api/public_mentors`);
    res
      .json()
      .then((res) => setUsers(res))
      .catch((err) => setErrors(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const { users } = useContext(Context);
  const { currentUser } = useContext(Context);

  //this is the user card pulling from the currentUser data from login
  const userCard = (
    <div className="user_box" key={currentUser.id}>
      <h2>{currentUser.name}</h2>
      <p>
        You have booked {currentUser.open_sessions} sessions out of 3 available
        this week
      </p>
    </div>
  );

  //this is the mentor card that gets mapped through to make the card list of mentors
  const mentorCards = users.map((stateUsers) => (
    <Card stateUsers={stateUsers} />
  ));

  return (
    <>
      {userCard}
      {mentorCards}
    </>
  );
};

export default DashboardCards;
