import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import ForumCard from "./ForumCard";

import PageTransition from "../../styles/PageTransition";

import "./Forum.css";

const Forum = () => {
  const [totalPosts, setTotalPosts] = useState([]);

  const history = useHistory();

  const handleSubForum = (subject) => {
    history.push(`/forum/${subject}`);
  };

  useEffect(() => {
    const getTotalPosts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/total-posts`,
          { credentials: "include" }
        );
        if (!response.ok) {
          throw new Error("Server error. Cannot fetch total number of posts");
        }

        const data = await response.json();
        setTotalPosts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getTotalPosts();
  }, []);

  return (
    <PageTransition>
      <div className="forum-page">
        <div className="forum-cards">
          <ForumCard
            subject="BD"
            subjectFullName="Baze de date"
            color="#fff"
            bgColor="#4281A4"
            description="Aici sunt afișate postările pentru disciplina 'Baze de date'"
            handleSubForum={handleSubForum}
            totalPosts={totalPosts["BD"]}
          />
          <ForumCard
            subject="PL"
            subjectFullName="Proiectare logică"
            color="#fff"
            bgColor="#00916E"
            description="Aici sunt afișate postările pentru disciplina 'Proiectare logică'"
            handleSubForum={handleSubForum}
            totalPosts={totalPosts["PL"]}
          />
          <ForumCard
            subject="POO"
            subjectFullName="Programare orientată pe obiecte"
            color="#fff"
            bgColor="rgb(231, 111, 0)"
            description="Aici sunt afișate postările pentru disciplina 'Programare orientată pe obiecte'"
            handleSubForum={handleSubForum}
            totalPosts={totalPosts["POO"]}
          />
          <ForumCard
            subject="RET"
            subjectFullName="Rețele de calculatoare"
            color="#fff"
            bgColor="rgb(54, 168, 227)"
            description="Aici sunt afișate postările pentru disciplina 'Rețele de calculatoare'"
            handleSubForum={handleSubForum}
            totalPosts={totalPosts["RET"]}
          />
        </div>
      </div>
    </PageTransition>
  );
};

export default Forum;
