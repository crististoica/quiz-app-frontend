import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../../store/User/UserContext";

import LoginSVG from "../../components/Logos/LoginSVG";
import PageTransition from "../../styles/PageTransition";

import CircularProgress from "@material-ui/core/CircularProgress";

const Login = () => {
  const { userGlobalState, userGlobalDispatch } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      email,
      password,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      if (data.isLoggedIn) {
        setLoading(false);
        userGlobalDispatch({ type: "LOGIN", data });
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const setButtonContent = () => {
    if (loading) {
      return <CircularProgress size={20} color="primary" />;
    } else {
      return "Login";
    }
  };

  return (
    <PageTransition>
      {!userGlobalState.isLoggedIn ? (
        <form onSubmit={handleSubmit}>
          <div className="user-logo-container">
            <div className="form-type">Login</div>
            <LoginSVG fillColor="#EF5B5B" />
          </div>
          {error && <h1>Hello</h1>}
          <div className="entry">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
          </div>
          <div className="entry">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
          </div>
          <div className="form-controls">
            <button type="submit" onClick={() => setLoading(true)}>
              {setButtonContent()}
            </button>
          </div>
        </form>
      ) : (
        <Redirect to="/dashboard" />
      )}
    </PageTransition>
  );
};

export default Login;
