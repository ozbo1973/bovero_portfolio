import React from "react";
import Typed from "react-typed";
import Baselayout from "../components/layouts/Baselayout";

import { Container, Row, Col } from "reactstrap";

class Index extends React.Component {
  state = { isFlipping: false, cardStatus: "front" };

  componentDidMount() {
    this.cardAnimaiton();
  }

  componentWillUnmount() {
    this.cardInterval && clearInterval(this.cardInterval);
  }

  cardAnimaiton = () => {
    this.cardInterval = setInterval(() => {
      const cardStatus = this.state.cardStatus === "front" ? "back" : "front";
      this.setState({ isFlipping: !this.state.isFlipping, cardStatus });
    }, 15000);
  };

  renderCard = side => {
    const { shadowClass, classes, title, subtitle, img } = flipperData[side];
    const { isFlipping } = this.state;
    return (
      <div className={`flipper ${isFlipping ? "isFlipping" : ""}`}>
        <div className={classes}>
          <div className="hero-section-content">
            <h2> {title} </h2>
            <div className="hero-section-content-intro">{subtitle}</div>
          </div>
          <img className="image" src={img} />
          <div className={shadowClass}>
            <div className="shadow-inner"> </div>
          </div>
        </div>
      </div>
    );
  };

  renderUser = () => {
    const { user, isAuthenticated } = this.props.auth;
    return isAuthenticated && <span className="bold">{user.name} </span>;
  };

  render() {
    return (
      <Baselayout
        {...this.props.auth}
        className={`cover ${this.state.isFlipping ? "cover-0" : "cover-1"}`}
        headerType="index"
      >
        <div className="main-section">
          <div className="background-image">
            <img src="/static/images/background-index.png" />
          </div>

          <Container>
            <Row>
              <Col md="6">
                <div className="hero-section">
                  {this.renderCard(this.state.cardStatus)}
                </div>
              </Col>
              <Col md="6" className="hero-welcome-wrapper">
                <div className="hero-welcome-text">
                  <h1>
                    {this.renderUser()}
                    Welcome to the portfolio website of Filip Jerga. Get
                    informed, collaborate and discover projects I was working on
                    through the years!
                  </h1>
                </div>
                <Typed
                  strings={typedList}
                  typeSpeed={70}
                  backSpeed={40}
                  loop
                  className="self-typed"
                />
                <div className="hero-welcome-bio">
                  <h1>Let's take a look at my work.</h1>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Baselayout>
    );
  }
}

const flipperData = {
  front: {
    img: "/static/images/section-1.png",
    title: "Full Stack Web Developer",
    subtitle: "Have a look at my portfolio and job history.",
    classes: "front",
    shadowClass: "shadow-custom"
  },
  back: {
    img: "/static/images/section-2.png",
    title: "Get Your Projects Completed",
    subtitle: "Professional and quality web development.",
    classes: "back",
    shadowClass: "shadow-custom-2"
  }
};

const typedList = [
  "Human Resources Specialist(Info Systems)",
  "React/Redux Developer",
  "Excel/VBA",
  "html/css/JS",
  "MS Sharepoint Developer",
  "Databases:MongoDB,MSAccess",
  "Git versioning",
  "Data analyst/Visualization"
];

export default Index;
