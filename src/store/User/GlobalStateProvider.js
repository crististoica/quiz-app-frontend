import React from "react";
import useGlobalState from "./useGlobalState";
import UserContext from "./UserContext";

const GlobalStateProvider = ({ children }) => {
  return (
    <UserContext.Provider value={useGlobalState()}>
      {children}
    </UserContext.Provider>
  );
};

export default GlobalStateProvider;
