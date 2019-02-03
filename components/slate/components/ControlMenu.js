import React from "react";
import { Button } from "reactstrap";

const ControlMenu = props => {
  const { isSaving, edit } = props;
  return (
    <div className="control-menu">
      <h1 className="title">Write your Story...</h1>
      <div className="status-box"> {renderSaveText(isSaving, edit)} </div>
      <Button
        disabled={isSaving}
        onClick={() => props.saveBlog()}
        color="primary"
      >
        Save
      </Button>
    </div>
  );
};

const renderSaveText = (isSaving, edit) => {
  let msg;
  switch (isSaving) {
    case true:
      msg = edit ? "Updating..." : "Saving...";
      break;
    default:
      msg = "";
  }
  return msg;
};

export default ControlMenu;
