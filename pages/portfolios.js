import React from "react";
import { Router } from "../routes";
import { portfolioAPI } from "../actions";

import PortfolioCard from "../components/portfolios/PortfolioCard";
import NavBtn from "../components/portfolios/PortfolioNavButtons";
import Baselayout from "../components/layouts/Baselayout";
import BasePage from "../components/layouts/BasePage";

import { Row, Col } from "reactstrap";

class Portfolios extends React.Component {
  static async getInitialProps() {
    try {
      const portfolios = await portfolioAPI().get("/portfolios");
      return { portfolios: portfolios.data };
    } catch (error) {
      console.log(error);
      return { portfolios: [] };
    }
  }

  navigateToEdit = (e, id) => {
    e.stopPropagation();
    Router.pushRoute(`/portfolio/${id}/edit`);
  };

  deletePortfolio = async (e, portfolio) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete portfolio")) {
      let portfolioItem;
      try {
        portfolioItem = await portfolioAPI().delete(
          `/portfolios/${portfolio._id}`
        );
        Router.pushRoute("/portfolios");
      } catch (error) {
        console.log(errro, portfoioItem);
      }
    }
  };

  renderEditButtons = portfolio => {
    const { _id } = portfolio;
    const { isAuthenticated, isSiteOwner } = this.props.auth;
    if ((isAuthenticated, isSiteOwner)) {
      return (
        <React.Fragment>
          <NavBtn
            onClick={e => this.navigateToEdit(e, _id)}
            className="portfolio-card-btn"
            color="warning"
            text="Edit"
          />
          <NavBtn
            text="Delete"
            className="portfolio-card-btn"
            color="danger"
            onClick={e => this.deletePortfolio(e, portfolio)}
          />
        </React.Fragment>
      );
    }
  };

  renderTheList = () => {
    const { portfolios } = this.props;

    return portfolios.map(portfolio => {
      const displayButtons = this.renderEditButtons(portfolio);
      return (
        <Col key={portfolio._id} md="4">
          <PortfolioCard
            portfolio={portfolio}
            displayButtons={displayButtons}
          />
        </Col>
      );
    });
  };

  renderCreateButton = () => {
    const { isAuthenticated, isSiteOwner } = this.props.auth;
    if (isAuthenticated && isSiteOwner) {
      return (
        <NavBtn
          className="create-portfolio-btn"
          onClick={() => Router.pushRoute("/portfolioNew")}
          color="primary"
          text="Create Portfolio"
        />
      );
    }
  };

  render() {
    return (
      <Baselayout {...this.props.auth}>
        <BasePage title="Portfolios" className="portfolio-page">
          {this.renderCreateButton()}
          <div>
            <Row>{this.renderTheList()}</Row>
          </div>
        </BasePage>
      </Baselayout>
    );
  }
}

export default Portfolios;
