import React from "react";
import { Link } from "../../routes";

import "../../styles/Header.scss";

const Header = props => {
  return (
    <div className="header">
      <Link route="/index">
        <a>Home</a>
      </Link>
      <Link route="/about">
        <a>About</a>
      </Link>
      <Link route="/portfolios">
        <a>Portfolios</a>
      </Link>
      <Link route="/blogs">
        <a>Blogs</a>
      </Link>
      <Link route="/cv">
        <a>CV</a>
      </Link>
    </div>
  );
};

export default Header;
