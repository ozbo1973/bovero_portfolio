import React from "react";
import Header from "../shared/Header";

const Baselayout = props => {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
};

export default Baselayout;
