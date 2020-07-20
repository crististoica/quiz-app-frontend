import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../../store/User/UserContext";

import UserLogo from "../../components/Logos/UserLogo";
import PageTransition from "../../styles/PageTransition";

const Register = () => {
  const { userGlobalState } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      username,
      email,
      password,
    };

    try {
      await fetch(`${process.env.REACT_APP_API_URL}/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageTransition>
      {!userGlobalState.isLoggedIn ? (
        <form onSubmit={handleSubmit}>
          <div className="user-logo-container">
            <div className="form-type">Register</div>
            <UserLogo fillColor="#EF5B5B" />
          </div>
          <div className="entry">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="entry">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="entry">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-controls">
            <button type="submit">Register</button>
          </div>
        </form>
      ) : (
        <Redirect to="/dashboard" />
      )}
    </PageTransition>
  );
};

export default Register;
