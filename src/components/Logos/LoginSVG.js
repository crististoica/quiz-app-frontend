import React from "react";

const LoginSVG = (props) => {
  const { fillColor } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 2397 3333"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      imageRendering="optimizeQuality"
      fillRule="evenodd"
      clipRule="evenodd"
      style={{
        fill: fillColor,
      }}
    >
      <path
        d="M1141 1752H84c-47 0-85-38-85-85s38-85 85-85h1057l-344-394c-31-35-28-89 7-120s88-28 119 7l468 536c29 33 28 82-1 113l-467 535c-31 35-84 38-119 7s-38-85-7-120l344-394zm145 1579c-48 12-96-18-108-66s18-96 66-108c115-28 215-48 307-66 434-86 666-132 666-736V930c0-565-246-611-653-687-98-18-203-38-320-66-48-12-77-60-66-108 12-48 60-77 108-66 109 26 214 46 311 64 499 93 800 149 800 863v1425c0 752-283 808-811 912-94 19-196 39-299 64z"
        fillRule="nonzero"
      />
    </svg>
  );
};

export default LoginSVG;
