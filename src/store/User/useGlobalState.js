import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        username: action.data.username,
        isLoggedIn: action.data.isLoggedIn,
      };
    case "LOGOUT":
      return {
        username: action.data.username,
        isLoggedIn: action.data.isLoggedIn,
      };
    default: {
      return state;
    }
  }
};

const useGlobalState = () => {
  const [userGlobalState, userGlobalDispatch] = useReducer(reducer, {
    isLoggedIn: false,
    username: null,
  });

  return { userGlobalState, userGlobalDispatch };
};

export default useGlobalState;
