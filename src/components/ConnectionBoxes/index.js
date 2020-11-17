import React, { useContext } from "react";
import Context from "../../ApiContext";


const ConnectionsBoxes = () => {
    const {users} = useContext(Context);

    console.log("this is the value of : ", users);
    return users.map((user) => {
      return (
        <div className="connection_box" key={user.id}>
          <img src="/images/person1.jpg" alt="profile pic" />
          <h2>{user.name}</h2>
          <h3>{user.is_mentor ? "MENTOR" : "STUDENT"}</h3>
          <p>{user.current_job_title}</p>
          <p>{user.open_sessions} mentor sessions available this week</p>
          <label htmlFor="connect_btn">
            <button id="connect_btn">Connect</button>
          </label>
          <label htmlFor="full_profile_btn">
            <button id="full_profile_btn">Full Profile</button>
          </label>
        </div>
      );
    });
};
  
export default ConnectionsBoxes; 