import React from "react";
import Baselayout from "../layouts/Baselayout";
import BasePage from "../layouts/BasePage";

const namespace = "http://localhost:300/";

export default role => Component =>
  class withAuth extends React.Component {
    static async getInitialProps(args) {
      const pageProps =
        (await Component.getInitialProps) &&
        (await Component.getInitialProps(args));

      return { ...pageProps };
    }

    renderProtectedPage = () => {
      const { isAuthenticated, user } = this.props.auth;
      const userRole = user && user[`${namespace}role`];
      let isAuthorized = false;
      if (role) {
        if (userRole && userRole === role) {
          isAuthorized = true;
        }
      } else {
        isAuthorized = true;
      }

      if (!isAuthenticated) {
        return (
          <Baselayout {...this.props.auth}>
            <BasePage>
              <div>
                <h2>You are not authenticated, please log in.</h2>
              </div>
            </BasePage>
          </Baselayout>
        );
      } else if (!isAuthorized) {
        return (
          <Baselayout {...this.props.auth}>
            <BasePage>
              <div>
                <h2>You are not Authorized to view this page.</h2>
              </div>
            </BasePage>
          </Baselayout>
        );
      } else {
        return <Component {...this.props} />;
      }
    };
    render() {
      return this.renderProtectedPage();
    }
  };
