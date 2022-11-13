import React from "react";
import "./Scroll.style.scss";
const Scroll = (prop) => {
  return <div className="scrollbar">{prop.children}</div>;
};
export default Scroll;
