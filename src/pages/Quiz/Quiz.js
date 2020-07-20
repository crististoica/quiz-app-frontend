import React, { useState, useCallback, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import GradedQuizContext from "../../store/GradedQuiz/GradedQuizContext";

import Question from "../../components/Question/Question";
import "./Quiz.css";

const Quiz = (props) => {
  const { gradedQuizGlobalDispatch } = useContext(GradedQuizContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [progress, setProgress] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [counter, setCounter] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);

  const { color, bgColor, subject } = props;

  const history = useHistory();

  const numOfQuestions = localStorage.getItem("numOfQuestions");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/quiz`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subject, numOfQuestions }),
        });
        if (!response.ok) {
          throw new Error("Error");
        }
        localStorage.clear();
        const data = await response.json();

        setQuestions(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    !quizEnded && setTimeout(() => setCounter(counter + 1000), 1000);
  }, [counter]);

  const msToTime = (s) => {
    const ms = s % 1000;
    s = (s - ms) / 1000;
    const secs = s % 60;
    s = (s - secs) / 60;
    const mins = s % 60;
    const hrs = (s - mins) / 60;

    return hrs + ":" + mins + ":" + secs + "." + ms;
  };

  const nextQuestion = useCallback(() => {
    return setCurrentQuestion((state) =>
      state + 1 > questions.length - 1 ? state : state + 1
    );
  }, [setCurrentQuestion, questions]);

  const prevQuestion = useCallback(() => {
    return setCurrentQuestion((state) => (state - 1 < 0 ? state : state - 1));
  }, [setCurrentQuestion, questions]);

  const handleProgress = (index, answer) => {
    if (progress[index]) {
      const updatedProgress = [...progress];
      updatedProgress[index].answer = answer;
      setProgress(updatedProgress);
    } else {
      setProgress([
        ...progress,
        { answer: index, questionIndex: questions[currentQuestion].index },
      ]);
    }
  };

  const handleQuizGrade = async () => {
    try {
      const progressBody = {
        subject: subject,
        body: JSON.parse(localStorage.getItem("progress")),
      };

      localStorage.clear();

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/quiz/grade-quiz`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(progressBody),
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      gradedQuizGlobalDispatch({ type: "ADD_QUIZ", data });
    } catch (error) {
      console.log(error);
    }

    history.push("/quiz/quiz-result");
    setQuizEnded(true);

    const styles = {
      color,
      bgColor,
      subject,
      time: msToTime(counter),
    };
    localStorage.setItem("quizResultStyles", JSON.stringify(styles));
  };

  return (
    <div className="quiz-container">
      {questions.length > 0 && (
        <Question
          question={questions[currentQuestion].question}
          answerOptions={questions[currentQuestion].options}
          handleProgress={handleProgress}
          currentQuestionIndex={currentQuestion}
          progress={progress}
          color={color}
          bgColor={bgColor}
          subject={subject}
          questionNumber={questions[currentQuestion].index + 1}
        />
      )}
      <div className="quiz-controls">
        <button
          onClick={prevQuestion}
          style={{ backgroundColor: bgColor, color: color }}
        >
          {currentQuestion === 0 ? "..." : "Anterior"}
        </button>
        <button
          onClick={() => {
            nextQuestion();
            if (currentQuestion === questions.length - 1) {
              handleQuizGrade();
            }
          }}
          style={{ backgroundColor: bgColor, color: color }}
        >
          {currentQuestion === questions.length - 1 ? "Finalizare" : "Urmator"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
