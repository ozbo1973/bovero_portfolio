import { Field } from "formik";
import Moment from "moment";
import { properName } from "./utils";
import PortInput from "../components/forms/PortInput";
import PortDate from "../components/forms/PortDate";

export const validateForm = values => {
  let errors = {};

  Object.entries(values).map(([key, val]) => {
    if (!values[key] && key !== "endDate") {
      const fieldName = properName(key);

      errors[key] = `${fieldName} is required.`;
    }
  });

  const startDate = Moment(values.startDate);
  const endDate = Moment(values.endDate);

  if (startDate && endDate && endDate.isBefore(startDate)) {
    errors.endDate = "End date cannot be before start date";
  }
  // errors = {};

  return errors;
};

export const renderFormFields = (displayValues, frompage) => {
  return Object.keys(displayValues).map(val => {
    const type = val === "description" ? "textarea" : "text";
    const labels = properName(val);

    let PortComponent = PortInput;
    let dateValue = undefined;

    if (val.toLowerCase().includes("date")) {
      PortComponent = PortDate;
      dateValue = displayValues[val];
    }

    return (
      <Field
        frompage={frompage}
        key={`${val}_input`}
        label={`${labels}: `}
        datevalue={dateValue}
        type={type}
        name={val}
        component={PortComponent}
      />
    );
  });
};
