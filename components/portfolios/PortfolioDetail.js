import React from "react";
import Moment from "moment";
import { properName, pickObj } from "../../helpers/utils";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const PortfolioDetail = ({ isOpen, toggle, className, portfolio }) => {
  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{portfolio.title}</ModalHeader>
        <ModalBody>
          <div>{getFields(portfolio)}</div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const getFields = portfolio => {
  const condensed = pickObj(portfolio, [
    "company",
    "location",
    "position",
    "description",
    "startDate",
    "endDate"
  ]);

  if (condensed && !condensed.endDate) {
    condensed.endDate = null;
  }

  return Object.keys(condensed).map(key => {
    let val = condensed[key];
    let newKey = key;
    if (key === "startDate" || key === "endDate") {
      newKey = key.split("Date")[0] + " Date";
      if (!condensed[key]) {
        val = "Present";
      } else {
        val = Moment(val).format("MMMM YYYY");
      }
    }

    return (
      <p key={key}>
        <b>{properName(newKey)}</b>: {val}
      </p>
    );
  });
};
export default PortfolioDetail;
