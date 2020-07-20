import React from "react";
import Forum from "@material-ui/icons/Forum";

import "./Quiz.css";

const ResultInfo = (props) => {
  const { subject, score, color, time } = props;

  return (
    <div className="result-info">
      <div className="entries">
        <div className="entry">
          Subiect:{" "}
          <span
            style={{
              display: "inline-block",
              color: color,
              fontWeight: 700,
            }}
          >
            {subject}
          </span>
        </div>
        <div className="entry">
          Raspunsuri corecte:{" "}
          <span
            style={{
              color: color,
              fontWeight: 700,
            }}
          >
            {score}
          </span>
        </div>
        <div className="entry">
          Durata:{" "}
          <span
            style={{
              display: "inline-block",
              color: color,
              fontWeight: 700,
            }}
          >
            {time}
          </span>
        </div>
      </div>
      <div
        className="footer"
        style={{
          color: color,
        }}
      >
        <div>Mai jos sunt afisate intrebarile la care ai raspuns gresit. </div>
        <div style={{ position: "relative" }}>
          Apasa pe "
          <Forum style={{ fill: color }} className="forum-icon-info" />" pentru
          a cere ajutor celorlalti utilizatori.
        </div>
      </div>
    </div>
  );
};

export default ResultInfo;
