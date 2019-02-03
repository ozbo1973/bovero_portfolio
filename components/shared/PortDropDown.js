import React from "react";

import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class PortDropDown extends React.Component {
  state = { dropdownOpen: false };

  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

  renderOptions = () => {
    const { dropDownOpts } = this.props;
    return dropDownOpts.map((opt, idx) => (
      <DropdownItem key={`${idx}_${opt.value}`} onClick={opt.handle}>
        {opt.display}
      </DropdownItem>
    ));
  };

  render() {
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret />
        <DropdownMenu>{this.renderOptions()}</DropdownMenu>
      </ButtonDropdown>
    );
  }
}

export default PortDropDown;
