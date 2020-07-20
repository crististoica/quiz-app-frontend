import React from "react";

const UserLogo = (props) => {
  const { fillColor } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      imageRendering="optimizeQuality"
      fillRule="evenodd"
      clipRule="evenodd"
      viewBox="0 0 640 640"
      style={{
        fill: fillColor,
      }}
    >
      <path d="M.012 596.535v-89.399c47.835-21.283 194.258-61.76 201.18-120.309 1.559-13.216-29.623-63.591-36.768-87.733-15.284-24.378-20.764-63.084-4.028-88.844 6.65-10.228 3.803-47.552 3.803-61.642 0-140.151 245.59-140.2 245.59 0 0 17.74-4.075 50.304 5.551 64.24 16.11 23.304 7.784 64.62-5.775 86.246-8.705 25.382-41.812 73.36-38.989 87.733 10.524 53.47 146.364 89.399 189.132 108.427l-.012 101.281H.012zM572.617 231.83v63.485H640V343.316h-67.383v67.371H524.604v-67.371h-67.371v-48.001h67.371v-67.383H572.617v3.898z" />
    </svg>
  );
};

export default UserLogo;
