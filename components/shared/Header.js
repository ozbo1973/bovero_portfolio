import React from "react";
import { Link } from "../../routes";
import auth0 from "../../services/auth";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from "reactstrap";

const BsNavLink = ({ route, title }) => {
  return (
    <NavItem className="port-navbar-item">
      <Link route={route}>
        <a className="nav-link port-navbar-link">{title} </a>
      </Link>
    </NavItem>
  );
};

const AuthButton = ({ btnName, handleOnClick }) => {
  return (
    <NavItem className="port-navbar-item">
      <span
        onClick={() => handleOnClick(btnName)}
        className="nav-link port-navbar-link pointer"
      >
        {btnName}
      </span>
    </NavItem>
  );
};

class Header extends React.Component {
  state = { isOpen: false };

  onMenuToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleLogIn = authType => {
    authType === "Log In" ? auth0.login() : auth0.logout();
  };

  renderAuth = () => {
    const btnName = this.props.isAuthenticated ? "Log Out" : "Log In";
    return <AuthButton btnName={btnName} handleOnClick={this.handleLogIn} />;
  };

  render() {
    return (
      <Navbar
        className={`port-navbar port-nav-base absolute ${this.props.className}`}
        color="transparent"
        dark
        expand="md"
      >
        <NavbarBrand className="port-navbar-brand">Brady Bovero</NavbarBrand>
        <NavbarToggler onClick={this.onMenuToggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <BsNavLink route="/" title="Home" />
            <BsNavLink route="/about" title="About" />
            <BsNavLink route="/portfolios" title="Portfolio" />
            <BsNavLink route="/blogs" title="Blog" />
            <BsNavLink route="/cv" title="Cv" />
            {this.renderAuth()}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Header;
