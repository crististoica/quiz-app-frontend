import React from "react";
import { Avatar } from "@material-ui/core";

import "./Forum.css";

const ForumCard = (props) => {
  const {
    subject,
    bgColor,
    color,
    subjectFullName,
    description,
    handleSubForum,
    totalPosts,
  } = props;

  return (
    <div
      className="forum-card"
      style={{
        borderRight: `5px solid ${bgColor}`,
      }}
    >
      <div className="left-section">
        <Avatar
          style={{
            width: "60px",
            height: "60px",
            color: color,
            backgroundColor: bgColor,
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          {subject}
        </Avatar>
        <div className="section-inner-container">
          <div
            className="title"
            style={{
              color: bgColor,
            }}
            onClick={() => handleSubForum(subject)}
          >
            <h2>{subjectFullName}</h2>
          </div>
          <div className="description">
            <p>{description}</p>
          </div>
        </div>
      </div>

      <div
        className="right-section"
        style={{
          color: bgColor,
          fontWeight: 700,
        }}
      >
        <>
          <div className="top">
            <span style={{ fontSize: 24 }}>{totalPosts}</span>
          </div>
          <div className="bottom">
            {totalPosts === 1 ? "POSTARE" : "POSTĂRI"}
          </div>
        </>
      </div>
    </div>
  );
};

export default ForumCard;
