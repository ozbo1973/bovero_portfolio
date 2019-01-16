import React from "react";
import axios from "axios";
import Baselayout from "../components/layouts/Baselayout";

class Portfolio extends React.Component {
  static async getInitialProps({ query }) {
    let portfolio;
    try {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${query.id}`
      );
      portfolio = res.data;
    } catch (error) {
      console.error(error);
    }

    return { portfolio };
  }
  render() {
    const { portfolio } = this.props;
    return (
      <Baselayout {...this.props.auth}>
        <h2>Detail Portfolio</h2>
        <h3>{portfolio.title}</h3>
        <p>body: {portfolio.body}</p>
      </Baselayout>
    );
  }
}

export default Portfolio;
