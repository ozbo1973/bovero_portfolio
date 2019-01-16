import React from "react";
import withAuth from "../components/hoc/withAuth";

import Baselayout from "../components/layouts/Baselayout";
import BasePage from "../components/layouts/BasePage";
import PortfolioCreateForm from "../components/portfolios/PortfolioCreateForm";
import { Row, Col } from "reactstrap";

class PortfolioNew extends React.Component {
  savePortfolio = portfolioData => {
    alert(JSON.stringify(portfolioData, null, 2));
  };

  render() {
    return (
      <Baselayout {...this.props.auth}>
        <BasePage className="portfolio-create-page" title="Create a Portfolio">
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <PortfolioCreateForm onSubmit={this.savePortfolio} />
            </Col>
          </Row>
        </BasePage>
      </Baselayout>
    );
  }
}

export default withAuth("siteOwner")(PortfolioNew);
