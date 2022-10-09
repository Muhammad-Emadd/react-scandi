import React from "react";
const Scroll = (prop) => {
  return (
    <div
      style={{
        overflowY: "auto",
        maxHeight: prop.maxHeight,
        scrollbarGutter: "stable",
        scrollbarWidth: "none",
      }}
    >
      {prop.children}
    </div>
  );
};
export default Scroll;
