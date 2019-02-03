import React from "react";

import { portfolioAPI } from "../actions";

import Baselayout from "../components/layouts/Baselayout";
import BasePage from "../components/layouts/BasePage";

import { Row, Col } from "reactstrap";

class BlogDetail extends React.Component {
  static async getInitialProps({ query }) {
    try {
      const blog = await portfolioAPI().get(`/blogs/s/${query.slug}`);
      return { blog: blog.data };
    } catch (error) {
      console.error(error);
      return { blog: {} };
    }
  }
  render() {
    const { blog } = this.props;
    return (
      <Baselayout {...this.props.auth}>
        <BasePage className="blog-detail-page">
          <Row>
            <Col sm={12} md={{ size: 8, offset: 2 }}>
              <div dangerouslySetInnerHTML={{ __html: blog.story }} />
            </Col>
          </Row>
        </BasePage>
      </Baselayout>
    );
  }
}

export default BlogDetail;
