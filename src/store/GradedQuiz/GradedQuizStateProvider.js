import React from "react";
import useGlobalState from "./useGlobalState";
import GradedQuizContext from "./GradedQuizContext";

const GradedQuizStateProvider = ({ children }) => {
  return (
    <GradedQuizContext.Provider value={useGlobalState()}>
      {children}
    </GradedQuizContext.Provider>
  );
};

export default GradedQuizStateProvider;
