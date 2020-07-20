import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";

import "./SubforumPost";

import "./Forum.css";
import SubforumPost from "./SubforumPost";
import PageTransition from "../../styles/PageTransition";

const SubForum = (props) => {
  const { subject, subjectFullName, color, bgColor } = props;

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/posts/${subject}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getPosts();
  }, []);

  return (
    <PageTransition>
      <div className="sub-forum">
        <div className="content">
          <div
            className="top"
            style={{
              borderBottom: `4px solid ${bgColor}`,
            }}
          >
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
            <div
              style={{
                color: bgColor,
              }}
            >
              <h2>{subjectFullName}</h2>
            </div>
          </div>
          <div className="middle">
            <div className="middle-content">
              {posts.length === 0 && (
                <h2
                  style={{
                    color: "gray",
                    textAlign: "center",
                  }}
                >
                  Momentan nu exista postari
                </h2>
              )}
              {posts.length !== 0 &&
                posts.map((post, index) => {
                  return (
                    <SubforumPost
                      key={index}
                      bgColor={bgColor}
                      post={post}
                      subject={subject}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default SubForum;
