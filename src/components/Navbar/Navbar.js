import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AppBar, Toolbar } from "@material-ui/core";

import UserContext from "../../store/User/UserContext";
import SchoolIcon from "@material-ui/icons/School";
import MenuComponent from "../Material/Menu";

import "./Navbar.css";

const Navbar = () => {
  const { userGlobalState, userGlobalDispatch } = useContext(UserContext);
  const history = useHistory();

  const handleLogout = () => {
    (async () => {
      await fetch("http://localhost:8080/logout", {
        method: "GET",
        credentials: "include",
      });
    })();
    userGlobalDispatch({
      type: "LOGOUT",
      data: { username: null, isLoggedIn: false },
    });
  };

  let links;
  if (userGlobalState.isLoggedIn) {
    links = (
      <div className="navbar-left-side">
        <div className="link forum-link">
          <NavLink to="/forum">Forum</NavLink>
        </div>
        <MenuComponent
          handleLogout={handleLogout}
          username={userGlobalState.username}
        />
      </div>
    );
  } else {
    links = (
      <>
        <div className="link">
          <NavLink to="/register">Register</NavLink>
        </div>
        <div className="link">
          <NavLink to="/login">Login</NavLink>
        </div>
      </>
    );
  }

  return (
    <AppBar position="static">
      <Toolbar className="navbar">
        <div
          onClick={() => history.push("/dashboard")}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="logo-container">
            <SchoolIcon style={{ color: "#EF5B5B", fontSize: 34 }} />
          </div>
        </div>

        <div className="list-container">{links}</div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
