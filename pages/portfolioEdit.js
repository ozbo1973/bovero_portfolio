import React from "react";
import withAuth from "../components/hoc/withAuth";
import { portfolioAPI } from "../actions";
import { pickObj } from "../helpers/utils";
import { Router } from "../routes";

import Baselayout from "../components/layouts/Baselayout";
import BasePage from "../components/layouts/BasePage";
import PortfolioCreateForm from "../components/portfolios/PortfolioCreateForm";
import { Row, Col } from "reactstrap";

class PortfolioEdit extends React.Component {
  state = { error: undefined };

  static async getInitialProps({ query }) {
    try {
      const portfolio = await portfolioAPI().get(`/portfolios/${query.id}`);
      return { portfolio: portfolio.data };
    } catch (error) {
      console.log(error);
      return { initError: error };
    }
  }

  updatePortfolio = async (portfolioData, { setSubmitting }) => {
    const { _id } = this.props.portfolio;
    setSubmitting(true);
    try {
      const portfolio = await portfolioAPI().patch(
        `/portfolios/${_id}`,
        portfolioData
      );
      this.setState({ error: undefined });
      Router.pushRoute("/portfolios");
    } catch (error) {
      this.setState({
        error: "Server Error: Unable to create portfolio."
      });
    }
    setSubmitting(false);
  };

  getFormFields = portfolio => {
    const condensed = pickObj(portfolio, [
      "title",
      "company",
      "location",
      "position",
      "description",
      "startDate",
      "endDate"
    ]);

    if (condensed && !condensed.endDate) {
      condensed.endDate = null;
    }

    return condensed;
  };

  render() {
    const { portfolio } = this.props;
    return (
      <Baselayout {...this.props.auth}>
        <BasePage className="portfolio-create-page" title="Edit a Portfolio">
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <PortfolioCreateForm
                fromPage="update"
                submitButtonText="Update"
                initialValues={this.getFormFields(portfolio)}
                error={this.state.error}
                onSubmit={this.updatePortfolio}
              />
            </Col>
          </Row>
        </BasePage>
      </Baselayout>
    );
  }
}

export default withAuth("siteOwner")(PortfolioEdit);
