import React from "react";
import Header from "../shared/Header";

const Baselayout = props => {
  const headerType = props.headerType || "default";

  return (
    <div className="layout-container">
      <Header
        className={`port-nav-${headerType}`}
        isAuthenticated={props.isAuthenticated}
        user={props.user}
      />

      <main className={`cover ${props.className}`}>
        <div className="wrapper">{props.children}</div>
      </main>
    </div>
  );
};

export default Baselayout;
