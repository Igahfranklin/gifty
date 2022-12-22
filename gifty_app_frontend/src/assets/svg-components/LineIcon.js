import React from "react";

const LineIcon = ({ width }) => {
  return (
    <svg
      width={width}
      height="1"
      viewBox={`0 0 ${width} 1`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="0.5"
        y1="0.5"
        x2="131.5"
        y2="0.5"
        stroke="#F6F5F5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default LineIcon;
