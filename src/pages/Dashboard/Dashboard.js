import React, { useState, useEffect } from "react";

import PageTransition from "../../styles/PageTransition";
import Card from "../../components/Card/Card";

import "./Dashboard.css";

import { verifyToken } from "../../auth/user";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isValid = async () => {
      const res = await verifyToken();
      setIsLoggedIn(res);
      return res;
    };
    isValid();
  }, [isLoggedIn]);

  return (
    <PageTransition>
      {isLoggedIn && (
        <div className="dashboard">
          <Card
            subject="PL"
            subjectFullName="Proiectare logică"
            color="#fff"
            bgColor="#00916E"
            imgSrc="/PL.jpg"
          />
          <Card
            subject="BD"
            subjectFullName="Baze de date"
            color="#fff"
            bgColor="#4281A4"
            imgSrc="/BD.png"
          />
          <Card
            subject="POO"
            subjectFullName="Programare orientată pe obiecte"
            color="#fff"
            bgColor="rgb(231, 111, 0)"
            imgSrc="/POO.png"
          />
          <Card
            subject="RET"
            subjectFullName="Rețele de calculatoare"
            color="#fff"
            bgColor="rgb(54, 168, 227)"
            imgSrc="/RET.png"
          />
        </div>
      )}
    </PageTransition>
  );
};

export default Dashboard;
