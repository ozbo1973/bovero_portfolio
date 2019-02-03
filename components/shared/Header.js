import React from "react";
import { Link } from "../../routes";
import ActiveLink from "./ActiveLink";
import auth0 from "../../services/auth";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from "reactstrap";

const BsNavLink = ({ route, title }) => {
  return (
    <NavItem className="port-navbar-item">
      <ActiveLink activeClassName="active" route={route}>
        <a className="nav-link port-navbar-link">{title} </a>
      </ActiveLink>
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

  renderBlogsMenu = () => {
    const { isSiteOwner } = this.props;
    if (isSiteOwner) {
      return (
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle
            className="port-navbar-item port-navbar-link"
            nav
            caret
          >
            Blog
          </DropdownToggle>
          <DropdownMenu className="port-navbar-dropdown-menu" right>
            <DropdownItem>
              <BsNavLink route="/blogs" title="Blogs" />
            </DropdownItem>
            <DropdownItem>
              <BsNavLink route="/blogs/new" title="Create Blog" />
            </DropdownItem>
            <DropdownItem>
              <BsNavLink route="/blogs/me" title="Blog Dashboard" />
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      );
    }
    return <BsNavLink route="/blogs" title="Blog" />;
  };

  render() {
    const { isOpen } = this.state;
    const { className } = this.props;
    const menuClass = isOpen
      ? { color: "", className: "menu-open" }
      : { color: "transparent", className: "menu-close" };

    return (
      <Navbar
        className={`port-navbar port-nav-base absolute ${className} ${
          menuClass.className
        }`}
        color={menuClass.color}
        dark
        expand="md"
      >
        <NavbarBrand className="port-navbar-brand">Brady Bovero</NavbarBrand>
        <NavbarToggler onClick={this.onMenuToggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <BsNavLink route="/" title="Home" />
            <BsNavLink route="/about" title="About" />
            <BsNavLink route="/portfolios" title="Portfolio" />
            {this.renderBlogsMenu()}
            <BsNavLink route="/cv" title="Cv" />
            {this.renderAuth()}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Header;
