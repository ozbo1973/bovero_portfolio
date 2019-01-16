import React from "react";
import Baselayout from "../components/layouts/Baselayout";
import BasePage from "../components/layouts/BasePage";

class Blogs extends React.Component {
  render() {
    return (
      <Baselayout {...this.props.auth}>
        <BasePage>
          <div>
            <h2>Blogs Page</h2>
          </div>
        </BasePage>
      </Baselayout>
    );
  }
}

export default Blogs;
