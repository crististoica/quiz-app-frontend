import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import GlobalStateProvider from "./store/User/GlobalStateProvider";
import GradedQuizStateProvider from "./store/GradedQuiz/GradedQuizStateProvider";
import "./styles/styles.css";
// removed React.StrictMode
ReactDOM.render(
  <GlobalStateProvider>
    <GradedQuizStateProvider>
      <App />
    </GradedQuizStateProvider>
  </GlobalStateProvider>,

  document.getElementById("root")
);
