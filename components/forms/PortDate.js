import React from "react";
import DatePicker from "react-datepicker";
import Moment from "moment";

import { FormGroup, Label, Button } from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";

class PortDate extends React.Component {
  state = { dateValue: Moment(), isHidden: false };

  handleChange = date => {
    const { setFieldValue, setFieldTouched } = this.props.form;
    const { name } = this.props.field;

    this.setState({
      dateValue: date
    });

    setFieldValue(name, date, true);
    setFieldTouched(name, true, true);
  };

  toggleEndDate = () => {
    const isHidden = !this.state.isHidden;
    const dateValue = isHidden ? undefined : Moment();
    this.setState({ isHidden });
    this.handleChange(dateValue);
  };

  renderPicker = ({ label, field, form: { touched, errors } }) => {
    if (field.name === "startDate" || !this.state.isHidden) {
      return (
        <React.Fragment>
          <Label>{label} </Label>
          <div className="input-group">
            <DatePicker
              selected={this.state.dateValue}
              onChange={this.handleChange}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              maxDate={Moment()}
              dropdownMode="select"
            />
          </div>
          {touched[field.name] && errors[field.name] && (
            <div className="error">{errors[field.name]}</div>
          )}
        </React.Fragment>
      );
    }
  };

  renderEndDateButton = ({ name }) => {
    if (name !== "endDate") {
      return null;
    }

    const btnText = !this.state.isHidden
      ? { text: "Still working here...", span: "" }
      : { text: "Set end date", span: "Still working here" };
    return (
      <div>
        <span>{btnText.span}</span>
        <Button onClick={() => this.toggleEndDate()}>{btnText.text}</Button>
      </div>
    );
  };

  render() {
    return (
      <FormGroup>
        <div>{this.renderPicker(this.props)}</div>
        {this.renderEndDateButton(this.props.field)}
      </FormGroup>
    );
  }
}

export default PortDate;
