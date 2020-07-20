import React, { useState, useEffect, useContext, useRef } from "react";

import QuizWrongQuestion from "../../components/Question/QuizWrongQuestion";

import GradedQuizContext from "../../store/GradedQuiz/GradedQuizContext";
import ResultInfo from "./ResultInfo";
import "./Quiz.css";

const QuizResult = () => {
  const { gradeQuizGlobalState, gradedQuizGlobalDispatch } = useContext(
    GradedQuizContext
  );

  const [quizResultStyles, setQuizResultStyles] = useState({});
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted.current) {
      const result = localStorage.getItem("quizResultStyles");
      setQuizResultStyles(JSON.parse(result));
      localStorage.clear();
    }

    return () => (isMounted.current = false);
  }, []);

  const setSubjectName = (subject) => {
    switch (subject) {
      case "POO":
        return "Programare orientată pe obiecte";
      case "PL":
        return "Proiectare logică";
      case "BD":
        return "Baze de date";
      case "RET":
        return "Rețele de calculatoare";
      default:
        return "";
    }
  };

  return (
    <div className="quiz-result">
      <ResultInfo
        subject={setSubjectName(quizResultStyles.subject)}
        score={gradeQuizGlobalState.score}
        color={quizResultStyles.bgColor}
        time={quizResultStyles.time}
      />
      {gradeQuizGlobalState.wrongAnswers.map((entry, index) => {
        return (
          <QuizWrongQuestion
            key={entry.questionBody.questionNumber}
            question={entry.questionBody.question}
            answerOptions={entry.questionBody.options}
            correctAnswer={entry.questionBody.correctAnswer}
            wrongAnswer={entry.userAnswer}
            color={quizResultStyles.color}
            bgColor={quizResultStyles.bgColor}
            subject={quizResultStyles.subject}
            questionNumber={entry.questionBody.questionNumber}
            showForumIcon={true}
          />
        );
      })}
    </div>
  );
};

export default QuizResult;
