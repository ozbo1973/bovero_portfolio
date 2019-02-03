import React from "react";
import { toast } from "react-toastify";

import withAuth from "../components/hoc/withAuth";
import { portfolioAPI } from "../actions";
import { pickObj } from "../helpers/utils";
import { noBlogFound } from "../components/slate/initial-value";

import Baselayout from "../components/layouts/Baselayout";
import BasePage from "../components/layouts/BasePage";
import Editor from "../components/slate/Editor";

class BlogEditorUpdate extends React.Component {
  state = { isSaving: undefined };

  static async getInitialProps({ query }) {
    try {
      const blog = await portfolioAPI().get(`/blogs/${query.id}`);
      return { blog: blog.data };
    } catch (error) {
      return { blog: {}, error };
    }
  }

  saveBlog = async (heading, story) => {
    try {
      const { title, subTitle } = heading;
      const updatedBlog = { title, subTitle, story };
      const prevBlog = pickObj(this.props.blog, [
        "_id",
        "title",
        "subTitle",
        "story"
      ]);
      const updateFields = Object.entries(updatedBlog).reduce((acc, nxt) => {
        if (nxt[1] !== prevBlog[nxt[0]]) {
          acc[nxt[0]] = nxt[1];
        }
        return acc;
      }, {});

      this.setState({ isSaving: true });
      const blog = await portfolioAPI().patch(
        `/blogs/${prevBlog._id}`,
        updateFields
      );
      this.setState({ isSaving: false });
      toast.success("Blog has been Updated");
    } catch (error) {
      console.log(error);
      this.setState({ isSaving: false });
      toast.error(
        "Unable to save, copy content and refresh. See console for error"
      );
    }
  };

  getValue = () => {
    const { blog } = this.props;
    return blog.story || noBlogFound;
  };

  render() {
    const { isSaving } = this.state;
    return (
      <Baselayout {...this.props.auth}>
        <BasePage
          containerClass="editor-wrapper"
          className="blog-editor-page"
          title="Update your Blog"
        >
          <Editor
            edit
            displayValue={this.getValue()}
            isSaving={isSaving}
            saveBlog={this.saveBlog}
          />
        </BasePage>
      </Baselayout>
    );
  }
}

export default withAuth("siteOwner")(BlogEditorUpdate);
