import React from "react";
import Head from "next/head";
import Header from "../shared/Header";

const Baselayout = props => {
  const { isAuthenticated, user, isSiteOwner, className, children } = props;
  const headerType = props.headerType || "default";
  const title = props.title || "Brady Bovero - Portfolio";
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="My name is Brady Bovero and I have over 15 years experience with building custom applications and websites. Working for the federal government I have created over 100 applications using many out of the box thinking and different technologies to accomplish tasks. "
        />
        <meta
          name="keywords"
          content="Brady Bovero,Bovero developer,Bovero applications,Bovero websites"
        />
        <meta
          property="og:title"
          content="Brady Bovero - programmer,developer"
        />
        <meta property="og:locale" content="en_USA" />
        <meta property="og:url" content={process.env.BASE_URL} />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="My name is Brady Bovero and I have over 15 years experience with building custom applications and websites."
        />
        <link rel="icon" type="image/ico" href="/static/favicon.ico" />
      </Head>
      <div className="layout-container">
        <Header
          className={`port-nav-${headerType}`}
          isAuthenticated={isAuthenticated}
          user={user}
          isSiteOwner={isSiteOwner}
        />

        <main className={`cover ${className}`}>
          <div className="wrapper">{children}</div>
        </main>
      </div>
    </React.Fragment>
  );
};

export default Baselayout;
