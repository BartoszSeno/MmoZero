// Wall.js

import React from "react";

const Wall = (props: { style: any }) => {
  const wallStyle = {
    width: "20px",
    height: "100px",
    position: "absolute",
    backgroundColor: "red",
    ...props.style, // Dodaj style z props
  };

  return <div style={wallStyle}></div>;
};

export default Wall;
