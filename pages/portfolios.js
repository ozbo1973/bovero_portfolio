import React from "react";
import axios from "axios";
import { Link } from "../routes";
import Baselayout from "../components/layouts/Baselayout";

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
    return portfolios.map(portfolio => (
      <li key={portfolio.id}>
        <Link route={`/${pg}/${portfolio.id}`}>
          <a>{portfolio.title}</a>
        </Link>{" "}
      </li>
    ));
  };

  render() {
    return (
      <Baselayout>
        <div>
          <h2>Portfolios Page</h2>
          <ul>{this.renderList()}</ul>
        </div>
      </Baselayout>
    );
  }
}

export default Portfolios;
