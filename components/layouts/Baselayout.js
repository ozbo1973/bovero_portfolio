import React from "react";
import Head from "next/head";
import Header from "../shared/Header";

const Baselayout = props => {
  const headerType = props.headerType || "default";

  return (
    <React.Fragment>
      <Head>
        <title>Brady Bovero</title>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
          integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
          crossorigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <div className="layout-container">
        <Header
          className={`port-nav-${headerType}`}
          isAuthenticated={props.isAuthenticated}
          user={props.user}
          isSiteOwner={props.isSiteOwner}
        />

        <main className={`cover ${props.className}`}>
          <div className="wrapper">{props.children}</div>
        </main>
      </div>
    </React.Fragment>
  );
};

export default Baselayout;
