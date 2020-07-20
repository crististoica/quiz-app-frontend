import React from "react";
import { Avatar } from "@material-ui/core";

import "./Question.css";

const Question = (props) => {
  const {
    question,
    answerOptions,
    handleProgress,
    currentQuestionIndex,
    progress,
    color,
    bgColor,
    subject,
    questionNumber,
  } = props;

  const handleInputChange = (e) => {
    //console.log(e.target.checked);
  };

  return (
    <div className="question-container">
      <div className="question-inner-container">
        <div className="question-top">
          <div className="avatar-container">
            <Avatar
              style={{
                color: color,
                backgroundColor: bgColor,
                fontSize: 15,
                fontWeight: "bold",
                marginBottom: ".5rem",
              }}
            >
              {subject}
            </Avatar>
            <div
              className="question-number"
              style={{
                borderBottom: `4px solid ${bgColor}`,
              }}
            >
              Întrebarea:{" "}
              <span style={{ color: bgColor }}>{questionNumber}</span>
            </div>
          </div>
          <div className="question-text">{question}</div>
        </div>

        <div className="answers-container">
          {answerOptions.map((option, index) => {
            return (
              <label
                key={index}
                onClick={() => {
                  handleProgress(currentQuestionIndex, index);
                  localStorage.clear();
                  localStorage.setItem("progress", JSON.stringify(progress));
                }}
                className="option-container"
              >
                <input
                  type="radio"
                  checked={
                    progress[currentQuestionIndex] &&
                    progress[currentQuestionIndex].answer === index
                      ? true
                      : false
                  }
                  className="radio-btn"
                  onChange={(e) => handleInputChange(e)}
                />
                <div
                  className="before"
                  style={{ backgroundColor: bgColor }}
                ></div>
                <div className="option">{option}</div>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Question;
