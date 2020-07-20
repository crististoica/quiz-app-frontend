import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

import SwitchComponent from "./router/Switch";

import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <SwitchComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
