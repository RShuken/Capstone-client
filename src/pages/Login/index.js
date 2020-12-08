import React, { useContext, useState } from "react";
import ApiContext from "../../ApiContext";
import config from "../../config";

function Login() {
  const appContext = useContext(ApiContext);
  const [formValues, setFormValues] = useState({});
  const tryLogin = (e) => {
    e.preventDefault();
    const data = { ...formValues };
    fetch(`${config.API_ENDPOINT}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => {
        delete data.password;
        window.sessionStorage.setItem("currentUser", JSON.stringify(data));
        appContext.updateUser(data);
        window.location.href = "/dashboard";
      });
  };
  const onFormValueChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  return (
    <form onSubmit={tryLogin}>
      <label for='email'>
      <input
        required
        onChange={onFormValueChange}
        placeholder="john.doe@gmail.com"
        name="email"
        type="email"
      /></label>
      <label for='password'><input
        required
        onChange={onFormValueChange}
        placeholder="super secret password"
        name="password"
        type="password"
      /></label>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
