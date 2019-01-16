import React from "react";
import PropTypes from "prop-types";
import { Container } from "reactstrap";

const BasePage = props => {
  return (
    <div className={`base-page ${props.className}`}>
      <Container>
        {props.title && (
          <div className="page-header">
            <h2 className="page-header-title">{props.title}</h2>
          </div>
        )}

        {props.children}
      </Container>
    </div>
  );
};

BasePage.defaultProps = {
  className: ""
};

BasePage.propTypes = {
  className: PropTypes.string
};

export default BasePage;
