import React from "react";

import { Link } from "../routes";
import Baselayout from "../components/layouts/Baselayout";
import BasePage from "../components/layouts/BasePage";

import { Row, Col, Button } from "reactstrap";

class CV extends React.Component {
  render() {
    const { auth } = this.props;
    return (
      <Baselayout {...this.props.auth} title="Brady Bovero - Curriculum Vitae">
        <BasePage title={`My CV Preview`} className="cv-page">
          <Row>
            <Col md={{ size: 8, offset: 2 }}>
              <div className="cv-download-btn">
                <a
                  className="btn btn-primary"
                  download="bovero_cv.pdf"
                  href="/static/docs/bovero_cv.pdf"
                >
                  Download
                </a>
              </div>
              <iframe
                className="cv-preview-frame"
                src="/static/docs/bovero_cv.pdf"
              />
            </Col>
          </Row>
        </BasePage>
      </Baselayout>
    );
  }
}

export default CV;
