import React from "react";
import { pickObj } from "../../helpers/utils";
import { Card, CardHeader, CardBody, CardTitle, CardText } from "reactstrap";
import PortfolioDetail from "./PortfolioDetail";

class PortfolioCard extends React.Component {
  state = { modal: false };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    const { portfolio, displayButtons } = this.props;

    return (
      <span onClick={this.toggle}>
        <PortfolioDetail
          isOpen={this.state.modal}
          toggle={this.toggle}
          portfolio={portfolio}
        />
        <Card className="portfolio-card">
          <CardHeader className="portfolio-card-header">
            {portfolio.position}
          </CardHeader>
          <CardBody>
            <p className="portfolio-card-city"> {portfolio.location} </p>
            <CardTitle className="portfolio-card-title">
              {portfolio.title}
            </CardTitle>
            <CardText className="portfolio-card-text">
              {portfolio.description}
            </CardText>
            <div className="readMore">{displayButtons}</div>
          </CardBody>
        </Card>
      </span>
    );
  }
}

export default PortfolioCard;
