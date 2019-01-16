import React from "react";
import axios from "axios";
import { Link } from "../routes";
import Baselayout from "../components/layouts/Baselayout";
import BasePage from "../components/layouts/BasePage";

import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText
} from "reactstrap";

class Portfolios extends React.Component {
  static async getInitialProps() {
    let portfolios;
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      portfolios = res.data;
    } catch (error) {
      console.error(error);
    }

    return { portfolios };
  }

  renderList = () => {
    const portfolios = this.props.portfolios.splice(0, 10);
    const pg = "portfolio";
    return portfolios.map((portfolio, index) => (
      // <li key={portfolio.id}>
      //   <Link route={`/${pg}/${portfolio.id}`}>
      //     <a>{portfolio.title}</a>
      //   </Link>{" "}
      // </li>
      <Col key={index} md="4">
        <React.Fragment key={portfolio.id}>
          <span>
            <Card className="portfolio-card">
              <CardHeader className="portfolio-card-header">
                Some Position {index}
              </CardHeader>
              <CardBody>
                <p className="portfolio-card-city"> Some Location {index} </p>
                <CardTitle className="portfolio-card-title">
                  Some Company {index}
                </CardTitle>
                <CardText className="portfolio-card-text">
                  Some Description {index}
                </CardText>
                <div className="readMore"> </div>
              </CardBody>
            </Card>
          </span>
        </React.Fragment>
      </Col>
    ));
  };

  render() {
    return (
      <Baselayout {...this.props.auth}>
        <BasePage title="Portfolios" className="portfolio-page">
          <div>
            <Row>{this.renderList()}</Row>
          </div>
        </BasePage>
      </Baselayout>
    );
  }
}

export default Portfolios;
