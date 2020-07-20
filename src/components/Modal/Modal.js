import React, { useState } from "react";

import QuizWrongQuestion from "../Question/QuizWrongQuestion";
import "./Modal.css";

const Modal = (props) => {
  const {
    answerOptions,
    bgColor,
    color,
    correctAnswer,
    question,
    questionNumber,
    subject,
    wrongAnswer,
  } = props.options;
  const { handleHelp } = props;

  const [title, setTitle] = useState(
    `${subject} - Întrebarea ${questionNumber}`
  );
  const [content, setContent] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const postBody = {
      author: "",
      content: {
        title: title,
        quizWrongQuestion: {
          question: question,
          answerOptions: answerOptions,
          correctAnswer: correctAnswer,
          wrongAnswer: wrongAnswer,
          color: color,
          bgColor: bgColor,
          subject: subject,
          questionNumber: questionNumber,
          showForumIcon: false,
        },
        postContent: content,
      },
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/create-post`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(postBody),
        }
      );

      handleHelp(false);

      if (!response.ok) {
        throw new Error("Something went bad");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal">
      <form className="modal-form" onSubmit={handleFormSubmit}>
        <div className="modal-form-entry">
          <label
            htmlFor="title"
            style={{
              color: bgColor,
              fontWeight: 700,
            }}
          >
            Titlu:{" "}
            <span
              style={{
                fontWeight: 700,
                color: "gray",
                fontSize: 15,
              }}
            >
              (il poti modifica)
            </span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            style={{
              borderLeft: `10px solid ${bgColor}`,
            }}
          />
        </div>
        <QuizWrongQuestion
          question={question}
          answerOptions={answerOptions}
          correctAnswer={correctAnswer}
          wrongAnswer={wrongAnswer}
          color={color}
          bgColor={bgColor}
          subject={subject}
          questionNumber={questionNumber}
          showForumIcon={false}
        />
        <div className="modal-form-entry">
          <label
            htmlFor="content"
            style={{
              color: bgColor,
              fontWeight: 700,
            }}
          >
            Continut:
          </label>
          <textarea
            id="content"
            rows={6}
            style={{
              borderLeft: `10px solid ${bgColor}`,
            }}
            onChange={handleContentChange}
          />
        </div>
        <div className="modal-form-control">
          <button
            className="btn-cancel"
            style={{
              backgroundColor: bgColor,
            }}
            onClick={() => handleHelp(false)}
          >
            Anuleaza
          </button>
          <button
            className="btn-send"
            style={{
              backgroundColor: bgColor,
            }}
          >
            Trimite
          </button>
        </div>
      </form>
    </div>
  );
};

export default Modal;
