import React, { useEffect, useContext } from "react";
import { AnimatePresence } from "framer-motion";
import { Switch, Route, Redirect } from "react-router-dom";

import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Quiz from "../pages/Quiz/Quiz";
import QuizResult from "../pages/Quiz/QuizResult";
import Forum from "../pages/Forum/Forum";
import SubForum from "../pages/Forum/SubForum";
import IndividualPost from "../pages/Forum/IndividualPost";

import UserContext from "../store/User/UserContext";

const SwitchComponent = () => {
  const { userGlobalState, userGlobalDispatch } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const result = await fetch("http://localhost:8080/verify", {
        credentials: "include",
      });
      const data = await result.json();
      if (data.isLoggedIn) {
        userGlobalDispatch({ type: "LOGIN", data });
      }
    })();
  }, []);

  const RequireAuth = ({ children }) => {
    if (!userGlobalState.isLoggedIn) {
      return <Redirect to="/login" />;
    }

    return children;
  };

  return (
    <AnimatePresence>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return userGlobalState.isLoggedIn ? (
              <Redirect to="/dashboard" />
            ) : (
              <Redirect to="/login" />
            );
          }}
        />
        <Route
          path="/register"
          render={() => {
            return userGlobalState.isLoggedIn ? (
              <Redirect to="/dashboard" />
            ) : (
              <Register />
            );
          }}
        />
        <Route
          exact
          path="/login"
          render={() => {
            return userGlobalState.isLoggedIn ? (
              <Redirect to="/dashboard" />
            ) : (
              <Login />
            );
          }}
        />

        <RequireAuth>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/forum" component={Forum} />
          <Route exact path="/forum/BD">
            <SubForum
              subject="BD"
              subjectFullName="Baze de date"
              color="#fff"
              bgColor="#4281A4"
            />
          </Route>
          <Route exact path="/forum/PL">
            <SubForum
              subject="PL"
              subjectFullName="Proiectare logică"
              color="#fff"
              bgColor="#00916E"
            />
          </Route>
          <Route exact path="/forum/POO">
            <SubForum
              subject="POO"
              subjectFullName="Programare orientată pe obiecte"
              color="#fff"
              bgColor="rgb(231, 111, 0)"
            />
          </Route>
          <Route exact path="/forum/RET">
            <SubForum
              subject="RET"
              subjectFullName="Rețele de calculatoare"
              color="#fff"
              bgColor="rgb(54, 168, 227)"
            />
          </Route>
          <Route path="/forum/RET/:id" component={IndividualPost} />
          <Route path="/forum/POO/:id" component={IndividualPost} />
          <Route path="/forum/BD/:id" component={IndividualPost} />
          <Route path="/forum/PL/:id" component={IndividualPost} />

          <Route exact path="/quiz/quiz-result">
            <QuizResult />
          </Route>
          <Route exact path="/quiz/BD">
            <Quiz color="#fff" bgColor="#4281A4" subject="BD" />
          </Route>
          <Route exact path="/quiz/PL">
            <Quiz color="#fff" bgColor="#00916E" subject="PL" />
          </Route>
          <Route exact path="/quiz/POO">
            <Quiz color="#fff" bgColor="rgb(231, 111, 0)" subject="POO" />
          </Route>
          <Route exact path="/quiz/RET">
            <Quiz color="#fff" bgColor="rgb(54, 168, 227)" subject="RET" />
          </Route>
        </RequireAuth>
      </Switch>
    </AnimatePresence>
  );
};

export default SwitchComponent;
