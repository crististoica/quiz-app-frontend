import React from "react";
import ReplyIcon from "@material-ui/icons/Reply";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { useHistory } from "react-router-dom";

import moment from "moment";

import "./Post.css";

const SubforumPost = (props) => {
  const { post, bgColor, subject } = props;

  const history = useHistory();

  const currentDate = moment(new Date()).format("DD-MM-YYYY");

  return (
    <div className="subforum-post">
      <div className="subforum-post-left">
        <AccountCircleIcon />
        {post.author}
      </div>
      <div className="subforum-post-middle">
        <h3
          style={{
            color: bgColor,
          }}
          onClick={() => history.push(`${subject}/${post.id}`)}
        >
          {post.title}
        </h3>

        <p>{post.content}</p>
      </div>
      <div className="subforum-post-right">
        <div>
          <div className="icon-container">
            <ReplyIcon style={{ fill: bgColor }} className="subforum-icon" />
            <div>{post.replies}</div>
          </div>
          <div className="icon-container">
            <CalendarTodayIcon
              style={{ fill: bgColor }}
              className="subforum-icon"
            />
            <div>
              {post.createdAt === currentDate ? "Astazi" : post.createdAt}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubforumPost;
