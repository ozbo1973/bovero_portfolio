import React from "react";
import { withRouter } from "next/router";
import auth from "../services/auth";

import Baselayout from "../components/layouts/Baselayout";
import BasePage from "../components/layouts/BasePage";

class Callback extends React.Component {
  async componentDidMount() {
    await auth.handleAuthentication();
    this.props.router.push("/");
  }

  render() {
    return (
      <Baselayout>
        <BasePage>
          <div>
            <h2>Verify login....</h2>
          </div>
        </BasePage>
      </Baselayout>
    );
  }
}

export default withRouter(Callback);
