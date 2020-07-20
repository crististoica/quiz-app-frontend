import React, { useState, useRef } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import "./Material.css";

const MenuComponent = (props) => {
  const { username, handleLogout } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const menuElement = useRef(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="menu-container">
      <AccountCircleIcon />
      <h3>{username}</h3>
      <IconButton
        aria-label="more"
        aria-controls={menuElement}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon
          style={{
            borderRadius: "50%",
          }}
        />
      </IconButton>
      <Menu
        ref={menuElement}
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 45 * 4.5,
            width: "20ch",
            marginTop: 50,
          },
        }}
        className="menu-component"
      >
        <MenuItem
          onClick={() => {
            handleLogout();
            handleClose();
          }}
        >
          Logout
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
          }}
        >
          TEST_1
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
          }}
        >
          TEST_2
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MenuComponent;
