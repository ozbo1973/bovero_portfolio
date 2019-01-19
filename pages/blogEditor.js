import React from "react";

import withAuth from "../components/hoc/withAuth";
import Baselayout from "../components/layouts/Baselayout";
import BasePage from "../components/layouts/BasePage";
import Editor from "../components/slate/Editor";

class BlogEditor extends React.Component {
  render() {
    console.log();

    return (
      <Baselayout {...this.props.auth}>
        <BasePage className="blog-editor-page" title="I am BlogEditor Page">
          <Editor />
        </BasePage>
      </Baselayout>
    );
  }
}

export default withAuth("siteOwner")(BlogEditor);
