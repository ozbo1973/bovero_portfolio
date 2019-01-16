import React from "react";
import Baselayout from "../components/layouts/Baselayout";
import BasePage from "../components/layouts/BasePage";

class About extends React.Component {
  render() {
    console.log();

    return (
      <Baselayout {...this.props.auth}>
        <BasePage className="about-page" title="I am About Page" />
      </Baselayout>
    );
  }
}

export default About;
