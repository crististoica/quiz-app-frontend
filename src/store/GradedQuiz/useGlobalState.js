import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_QUIZ":
      return {
        score: action.data.score,
        wrongAnswers: action.data.wrongAnswers,
      };
    default: {
      return state;
    }
  }
};

const useGlobalState = () => {
  const [gradeQuizGlobalState, gradedQuizGlobalDispatch] = useReducer(reducer, {
    score: 0,
    wrongAnswers: [],
  });

  return { gradeQuizGlobalState, gradedQuizGlobalDispatch };
};

export default useGlobalState;
