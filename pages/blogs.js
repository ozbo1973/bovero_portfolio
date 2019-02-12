import React from "react";
import moment from "moment";

import { Link } from "../routes";
import { shortenText } from "../helpers/utils";
import { portfolioAPI } from "../actions";

import Baselayout from "../components/layouts/Baselayout";
import BasePage from "../components/layouts/BasePage";

import { Row, Col, Container } from "reactstrap";
import { FontAwesome } from "../components/shared/CssLibs";

class Blogs extends React.Component {
  static async getInitialProps() {
    try {
      const blogs = await portfolioAPI().get("/blogs");
      return { blogs: blogs.data };
    } catch (error) {
      console.error(error);
      return { blogs: [] };
    }
  }

  renderBlogList = () => {
    const { blogs } = this.props;
    return blogs.map(blog => (
      <React.Fragment key={`${blog._id}__publishedList`}>
        <div className="post-preview">
          <Link route={`/blogs/${blog.slug}`}>
            <a>
              <h2 className="post-title">{blog.title}</h2>
              <h3 className="post-subtitle">
                {shortenText(blog.subTitle, 100)}
              </h3>
            </a>
          </Link>
          <p className="post-meta">
            Posted by
            <a href="#"> {blog.author} </a>
            {moment(blog.createdAt).format("LLLL")}
          </p>
        </div>
        <hr />
      </React.Fragment>
    ));
  };

  render() {
    return (
      <Baselayout
        {...this.props.auth}
        headerType={"landing"}
        className="blog-listing-page"
        title="Brady Bovero - All of my Blogs"
      >
        <div
          className="masthead"
          style={{ backgroundImage: "url('/static/images/home-bg.jpg')" }}
        >
          <div className="overlay" />
          <Container>
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                <div className="site-heading">
                  <h1>Fresh Blogs</h1>
                  <span className="subheading">Programming, travelling...</span>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <BasePage className="blog-body">
          <Row>
            <Col md="10" lg="8" className="mx-auto">
              {this.renderBlogList()}
              <div className="clearfix">
                <a className="btn btn-primary float-right" href="#">
                  Older Posts &rarr;
                </a>
              </div>
            </Col>
          </Row>

          <footer>
            <Container>
              <Row>
                <div className="col-lg-8 col-md-10 mx-auto">
                  <ul className="list-inline text-center">
                    <li className="list-inline-item">
                      <a
                        target="_blank"
                        href="https://www.facebook.com/brady.bovero"
                      >
                        <span className="fa-stack fa-lg">
                          <i className="fas fa-circle fa-stack-2x" />
                          <i className="fab fa-facebook-f fa-stack-1x fa-inverse" />
                        </span>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a target="_blank" href="https://github.com/ozbo1973">
                        <span className="fa-stack fa-lg">
                          <i className="fas fa-circle fa-stack-2x" />
                          <i className="fab fa-github fa-stack-1x fa-inverse" />
                        </span>
                      </a>
                    </li>
                  </ul>
                  <p className="copyright text-muted">
                    Copyright &copy; Brady Bovero 2019
                  </p>
                </div>
              </Row>
            </Container>
          </footer>
        </BasePage>
        <FontAwesome />
      </Baselayout>
    );
  }
}

export default Blogs;
