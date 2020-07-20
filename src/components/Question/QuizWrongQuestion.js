import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import Forum from "@material-ui/icons/Forum";

import Modal from "../Modal/Modal";

import "./Question.css";

const Question = (props) => {
  const {
    question,
    answerOptions,
    correctAnswer,
    wrongAnswer,
    color,
    bgColor,
    subject,
    questionNumber,
    showForumIcon,
  } = props;

  const [showModal, setShowModal] = useState(false);
  const [lastScrollPosition, setlastScrollPosition] = useState(
    window.pageYOffset
  );

  const handleHelp = (toggle) => {
    if (toggle === false) {
      window.scroll({ top: lastScrollPosition, left: 0, behavior: "smooth" });
    } else {
      setlastScrollPosition(window.pageYOffset);
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }
    setShowModal(toggle);
  };

  const handleInputChange = (e) => {
    //console.log(e.target.checked);
  };

  const setResultText = (index) => {
    if (index === wrongAnswer) {
      return " Răspunsul tău";
    }
    if (index === correctAnswer) {
      return " Răspuns corect";
    }
  };

  return (
    <>
      {!showModal ? (
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
                {showForumIcon && (
                  <div className="get-help">
                    <Forum
                      style={{ fill: bgColor }}
                      className="forum-icon"
                      onClick={() => handleHelp(true)}
                    />
                  </div>
                )}
              </div>
              <div className="question-text">{question}</div>
            </div>

            <div className="answers-container">
              {answerOptions.map((option, index) => {
                return (
                  <label key={index} className="option-container">
                    <input
                      type="radio"
                      checked={
                        index === correctAnswer || index === wrongAnswer
                          ? true
                          : false
                      }
                      className="radio-btn"
                      onChange={(e) => handleInputChange(e)}
                    />
                    <div
                      className="before"
                      style={{
                        backgroundColor:
                          index === wrongAnswer ? "#ff0000" : bgColor,
                      }}
                    ></div>
                    <div className="option">
                      {option}
                      <span
                        style={{
                          color: index === correctAnswer ? bgColor : "#ff0000",
                          fontWeight: 700,
                          marginLeft: 5,
                        }}
                      >
                        {setResultText(index)}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <Modal options={props} handleHelp={handleHelp} />
      )}
    </>
  );
};

export default Question;
