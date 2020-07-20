import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ScheduleIcon from "@material-ui/icons/Schedule";
import moment from "moment";

import QuizWrongQuestion from "../../components/Question/QuizWrongQuestion";

import "./IndividualPost.css";

const IndividualPost = ({ match }) => {
  const [post, setPost] = useState({});
  const [postAnswer, setPostAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState(
    "Nu poti trimite un raspuns gol"
  );
  const [fetched, setFetched] = useState(false);
  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/get-post/${match.params.id}`,
          { credentials: "include" }
        );
        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();
        setPost(data);
        setFetched(true);
      } catch (error) {
        console.log(error);
      }
    };

    getPost();
  }, []);

  const handlePostAnswerChange = (e) => {
    setPostAnswer(e.target.value);
    if (e.target.value) {
      setErrorMessage("");
    } else {
      setErrorMessage("Nu poti trimite un raspuns gol");
    }
  };

  const handleAnswer = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/answer-post`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ answer: postAnswer, postId: post._id }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        setErrorMessage(data.error);
        throw new Error(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="individual-post">
      {fetched ? (
        <>
          <div className="post-question-container">
            <div className="individual-post-title">
              <h2 style={{ color: post.content.quizWrongQuestion.bgColor }}>
                {post.content.title}
              </h2>
              <div className="post-info">
                <div>
                  <AccountCircleIcon />
                </div>
                <div>{post.author.username}</div>
              </div>
            </div>
            <QuizWrongQuestion
              question={post.content.quizWrongQuestion.question}
              answerOptions={post.content.quizWrongQuestion.answerOptions}
              correctAnswer={post.content.quizWrongQuestion.correctAnswer}
              wrongAnswer={post.content.quizWrongQuestion.wrongAnswer}
              color={post.content.quizWrongQuestion.color}
              bgColor={post.content.quizWrongQuestion.bgColor}
              subject={post.content.quizWrongQuestion.subject}
              questionNumber={post.content.quizWrongQuestion.questionNumber}
              showForumIcon={post.content.quizWrongQuestion.showForumIcon}
            />
            <div className="individual-post-question-container">
              <div className="question-icon-container">
                <HelpIcon
                  style={{
                    width: 30,
                    height: 30,
                    fill: post.content.quizWrongQuestion.bgColor,
                  }}
                />
              </div>
              <div className="question-text-container">
                <p>{post.content.postContent}</p>
              </div>
            </div>
          </div>
          <div className="post-replies">
            <div
              className="post-replies-top"
              style={{ color: post.content.quizWrongQuestion.bgColor }}
            >
              <h2>Răspunsuri</h2>
            </div>
            {post.replies.length > 0 ? (
              post.replies.map((reply) => {
                return (
                  <div className="post-reply" key={reply._id}>
                    <div className="post-reply-top">
                      <div className="reply-top-info">
                        <div>
                          <AccountCircleIcon style={{ marginRight: 5 }} />
                          {reply.author.username}
                        </div>
                        <div className="reply-top-info-date">
                          <div>
                            <CalendarTodayIcon
                              style={{
                                fill: post.content.quizWrongQuestion.bgColor,
                                marginRight: 5,
                              }}
                            />
                            {moment(reply.createdAt).format("DD/MM/YYYY")}
                          </div>
                          <div>
                            <ScheduleIcon
                              style={{
                                fill: post.content.quizWrongQuestion.bgColor,
                                marginRight: 5,
                              }}
                            />
                            {moment(reply.createdAt).format("HH:mm")}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="post-reply-content">
                      <div>{reply.answer}</div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h3 className="no-replies">Momentan nu exista raspunsuri</h3>
            )}
          </div>
          <div className="answer-container">
            {errorMessage && <h3 className="error-message">{errorMessage}</h3>}
            <textarea rows="7" onChange={handlePostAnswerChange}></textarea>
            <button onClick={handleAnswer}>Raspunde</button>
          </div>
        </>
      ) : (
        <div className="loading">
          <CircularProgress size={200} color="inherit" />
        </div>
      )}
    </div>
  );
};

export default IndividualPost;
