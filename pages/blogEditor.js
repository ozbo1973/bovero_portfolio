import React from "react";
import { toast } from "react-toastify";

import withAuth from "../components/hoc/withAuth";
import { Router } from "../routes";
import { portfolioAPI } from "../actions";
import { initialValue } from "../components/slate/initial-value";

import Baselayout from "../components/layouts/Baselayout";
import BasePage from "../components/layouts/BasePage";
import Editor from "../components/slate/Editor";

class BlogEditor extends React.Component {
  state = { isSaving: undefined };

  saveBlog = async (heading, story) => {
    const { title, subTitle } = heading;
    try {
      const blog = { title, subTitle, story };
      this.setState({ isSaving: true });
      const createdBlog = await portfolioAPI().post("/blogs", blog);
      this.setState({ isSaving: false });
      Router.pushRoute(`/blogs/${createdBlog.data._id}/edit`);
      toast.success("Blog Saved");
    } catch (error) {
      this.setState({ isSaving: undefined });
      const message = error.message || "Server Error saving. -> " + error;
      console.log(message);
      toast.error(
        "Unable to save, copy content and refresh. See console for error"
      );
    }
  };

  render() {
    const { isSaving } = this.state;
    return (
      <Baselayout {...this.props.auth}>
        <BasePage
          containerClass="editor-wrapper"
          className="blog-editor-page"
          title=""
        >
          <Editor
            displayValue={initialValue}
            isSaving={isSaving}
            saveBlog={this.saveBlog}
          />
        </BasePage>
      </Baselayout>
    );
  }
}

export default withAuth("siteOwner")(BlogEditor);
