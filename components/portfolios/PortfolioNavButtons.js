import React from "react";

import { Button } from "reactstrap";

const PortfolioNavButtons = ({ className, onClick, text, color }) => {
  return (
    <Button className={className} onClick={onClick} color={color}>
      {text}
    </Button>
  );
};

export default PortfolioNavButtons;
