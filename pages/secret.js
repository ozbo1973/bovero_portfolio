import React from "react";
import withAuth from "../components/hoc/withAuth";
import { portfolioAPI } from "../actions";
import Baselayout from "../components/layouts/Baselayout";
import BasePage from "../components/layouts/BasePage";

class Secret extends React.Component {
  state = { secretData: [] };

  static async getInitialProps({ req }) {
    const superSecret = "Super Secret Value";
    const res = await portfolioAPI(req).get("/secret");

    return { secretData: res.data };
  }

  async componentDidMount() {
    //  const res = await secretDataApi().get("/secret");
    //  this.setState({ secretData: res.data });
  }

  displaySecretData = () => {
    const { secretData } = this.props;
    if (!secretData || secretData.length === 0) {
      return null;
    }
    return (
      <ul>
        {secretData.map(data => (
          <li key={data.title}>
            <h1>{data.title}</h1>
            <p>{data.description}</p>
          </li>
        ))}
      </ul>
    );
  };

  render() {
    return (
      <Baselayout {...this.props.auth}>
        <BasePage className="secret-page">
          <div>
            <h2>Secret Page</h2>
            <p>{this.props.superSecret}</p>
            {this.displaySecretData()}
          </div>
        </BasePage>
      </Baselayout>
    );
  }
}

export default withAuth()(Secret);
