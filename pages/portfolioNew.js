import React from "react";
import withAuth from "../components/hoc/withAuth";
import { portfolioAPI } from "../actions";
import { Router } from "../routes";

import Baselayout from "../components/layouts/Baselayout";
import BasePage from "../components/layouts/BasePage";
import PortfolioCreateForm from "../components/portfolios/PortfolioCreateForm";
import { Row, Col } from "reactstrap";

class PortfolioNew extends React.Component {
  state = { error: undefined };

  INTITIAL_VALUES = {
    title: "",
    company: "",
    location: "",
    position: "",
    description: "",
    startDate: "",
    endDate: ""
  };

  savePortfolio = async (portfolioData, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const portfolio = await portfolioAPI().post("/portfolios", portfolioData);
      this.setState({ error: undefined });
      Router.pushRoute("/portfolios");
    } catch (error) {
      this.setState({
        error: "Server Error: Unable to create portfolio."
      });
    }
    setSubmitting(false);
    // alert(JSON.stringify(portfolioData, null, 2));
  };

  render() {
    return (
      <Baselayout {...this.props.auth}>
        <BasePage className="portfolio-create-page" title="Create a Portfolio">
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <PortfolioCreateForm
                fromPage="new"
                submitButtonText="Create"
                initialValues={this.INTITIAL_VALUES}
                error={this.state.error}
                onSubmit={this.savePortfolio}
              />
            </Col>
          </Row>
        </BasePage>
      </Baselayout>
    );
  }
}

export default withAuth("siteOwner")(PortfolioNew);
