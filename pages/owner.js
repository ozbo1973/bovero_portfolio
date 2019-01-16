import React from "react";
import withAuth from "../components/hoc/withAuth";
import Baselayout from "../components/layouts/Baselayout";
import BasePage from "../components/layouts/BasePage";

class Owner extends React.Component {
  render() {
    return (
      <Baselayout {...this.props.auth}>
        <BasePage className="owner-page">
          <div>
            <h2>Owner Page</h2>
          </div>
        </BasePage>
      </Baselayout>
    );
  }
}

export default withAuth("siteOwner")(Owner);
