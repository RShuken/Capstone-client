import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import config from "../../config";
import ApiContext from "../../ApiContext";

function Registration() {
  const { registrationType } = useParams();
  const appContext = useContext(ApiContext);
  const [formValues, setFormValues] = useState({});
  const doRegisteration = (e) => {
    e.preventDefault();
    const data = { ...formValues, is_mentor: registrationType === "mentor" };
    fetch(`${config.API_ENDPOINT}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then(() => {
        delete data.password;
        window.sessionStorage.setItem("currentUser", JSON.stringify(data));
        appContext.currentUser = data;
        window.location.href = "/dashboard";
      });
  };
  const onFormValueChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  return (
    <form onSubmit={doRegisteration}>
      <input
        required
        onChange={onFormValueChange}
        placeholder="John Doe"
        name="name"
        type="text"
      />
      <input
        required
        onChange={onFormValueChange}
        placeholder="john.doe@gmail.com"
        name="email"
        type="email"
      />
      <input
        required
        onChange={onFormValueChange}
        placeholder="super secret password"
        name="password"
        type="password"
      />
      <select required onChange={onFormValueChange} name="open_sessions">
        <option value={1}>Available for 1 session a week</option>
        <option value={2}>Available for 2 session a week</option>
        <option value={3}>Available for 3 session a week</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}

export default Registration;
