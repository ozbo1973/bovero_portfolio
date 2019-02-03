import React from "react";
import { toast } from "react-toastify";

import { Link, Router } from "../routes";
import withAuth from "../components/hoc/withAuth";
import { shortenText } from "../helpers/utils";
import { portfolioAPI } from "../actions";

import Baselayout from "../components/layouts/Baselayout";
import BasePage from "../components/layouts/BasePage";
import PortDropDown from "../components/shared/PortDropDown";

import { Row, Col, Container, Button } from "reactstrap";

class UserBlogs extends React.Component {
  static async getInitialProps({ req }) {
    try {
      const blogs = await portfolioAPI(req).get("/blogs/me");
      return { blogs: blogs.data };
    } catch (error) {
      console.log(error);
      return { blogs: [] };
    }
  }

  onDelete = async blog => {
    const confirm = window.confirm(
      `Are you sure you wish to delete: ${blog.title}`
    );
    if (!confirm) {
      return null;
    }
    try {
      const deleted = await portfolioAPI().delete(`/blogs/${blog._id}`);
      toast.success(`Blog:${blog.title} was deleted`);
      Router.pushRoute("/userBlogs");
    } catch (error) {
      toast.error("Unable to delete blog see console");
      console.log(error);
    }
  };

  onStatusChange = async (status, blog) => {
    try {
      const statusChange = await portfolioAPI().patch(`/blogs/${blog._id}`, {
        status
      });
      toast.success(`Status changed to ${status}`);
      Router.pushRoute("/userBlogs");
    } catch (error) {
      console.error(error);
      toast.error("Not able to change status see console.");
    }
  };

  separateBlogs = () => {
    const { blogs } = this.props;
    return blogs.reduce(
      (acc, nxt) => {
        nxt.status === "draft" ? acc.draft.push(nxt) : acc.published.push(nxt);
        return acc;
      },
      { published: [], draft: [] }
    );
  };

  dropDownOpts = (status, blog) => {
    const text =
      status === "draft"
        ? { display: "Publish Story", value: "published" }
        : { display: "Make Draft", value: "draft" };
    return [
      {
        display: text.display,
        value: text.value,
        handle: () => {
          this.onStatusChange(text.value, blog);
        }
      },
      {
        display: "Delete",
        value: "delete",
        handle: () => {
          this.onDelete(blog);
        }
      }
    ];
  };

  renderBlogs = status => {
    const blogs = this.separateBlogs()[status];
    return (
      <ul className="user-blogs-list">
        {blogs.map(blog => (
          <li key={blog._id}>
            <Link route={`/blogs/${blog._id}/edit`}>
              <a>{shortenText(blog.title, 50)}</a>
            </Link>
            <PortDropDown
              dropDownOpts={this.dropDownOpts(blog.status, blog)}
              size="sm"
            />
          </li>
        ))}
      </ul>
    );
  };

  render() {
    return (
      <Baselayout {...this.props.auth} headerType={"landing"} className="">
        <div
          className="masthead"
          style={{ backgroundImage: "url('/static/images/home-bg.jpg')" }}
        >
          <div className="overlay" />
          <Container>
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                <div className="site-heading">
                  <h1>User Blogs Dashboard</h1>
                  <span className="subheading">Lets write some blogs...</span>
                  <div className="blog-user-heading-btn">
                    <Link route="/blogs/new">
                      <Button color="primary" size="lg">
                        Create a new Blog
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <BasePage className="blog-user-page">
          <Row>
            <Col md="6" className="mx-auto text-center">
              <h2 className="blog-status-title">Published Blogs</h2>

              {this.renderBlogs("published")}
            </Col>
            <Col md="6" className="mx-auto text-center">
              <h2 className="blog-status-title">Draft Blogs</h2>
              {this.renderBlogs("draft")}
            </Col>
          </Row>
        </BasePage>
      </Baselayout>
    );
  }
}

export default withAuth("siteOwner")(UserBlogs);
