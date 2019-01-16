import React from "react";
import Baselayout from "../components/layouts/Baselayout";
import BasePage from "../components/layouts/BasePage";

class CV extends React.Component {
  render() {
    return (
      <Baselayout {...this.props.auth}>
        <BasePage>
          <div>
            <h2>CV Page</h2>
          </div>
        </BasePage>
      </Baselayout>
    );
  }
}

export default CV;
