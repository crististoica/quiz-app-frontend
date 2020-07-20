import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import "./Card.css";

const Card = (props) => {
  const { subject, color, bgColor, imgSrc, subjectFullName } = props;

  const [numOfQuestions, setNumOfQuestions] = useState(8);
  const history = useHistory();

  const handleStart = () => {
    history.push(`/quiz/${subject}`);
    localStorage.setItem("numOfQuestions", numOfQuestions);
  };

  return (
    <div className="card">
      <div className="card-top">
        <Avatar
          style={{
            color: color,
            backgroundColor: bgColor,
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {subject}
        </Avatar>
        <p style={{ color: bgColor, fontWeight: "bold", marginLeft: "0.5rem" }}>
          {subjectFullName}
        </p>
      </div>
      <div className="card-middle">
        <img src={imgSrc} alt="PL" />
      </div>
      <div className="card-bottom">
        <div className="input-container">
          <label htmlFor="num-of-questions" style={{ color: bgColor }}>
            Nr întrebări
          </label>
          <input
            type="number"
            min="8"
            max="18"
            id="num-of-questions"
            value={numOfQuestions}
            onChange={(e) => setNumOfQuestions(e.target.value)}
            style={{
              border: `1px solid ${bgColor}`,
              borderLeft: `10px solid ${bgColor}`,
              color: bgColor,
            }}
          />
        </div>
        <button onClick={handleStart}>Start</button>
      </div>
    </div>
  );
};

export default Card;
