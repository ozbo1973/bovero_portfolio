import { Field } from "formik";
import PortInput from "../components/forms/PortInput";
import PortDate from "../components/forms/PortDate";

export const INTITIAL_VALUES = {
  title: "",
  company: "",
  location: "",
  position: "",
  description: "",
  startDate: "",
  endDate: ""
};

export const validateForm = values => {
  let errors = {};

  Object.entries(values).map(([key, val]) => {
    if (!values[key]) {
      const fieldName = key
        .split("")
        .map((f, i) => (i === 0 ? f.toUpperCase() : f))
        .join("");

      errors[key] = `${fieldName} is required.`;
    }
  });

  const { startDate, endDate } = values;

  if (startDate && endDate && endDate.isBefore(startDate)) {
    errors.endDate = "End date cannot be before start date";
  }

  return errors;
};

export const renderFormFields = () => {
  return Object.keys(INTITIAL_VALUES).map(val => {
    const type = val === "description" ? "textarea" : "text";

    const labels = val
      .split("")
      .map((l, i) => (i === 0 ? l.toUpperCase() : l))
      .join("");

    const PortComponent = val.toLowerCase().includes("date")
      ? PortDate
      : PortInput;

    return (
      <Field
        key={`${val}_input`}
        label={`${labels}: `}
        type={type}
        name={val}
        component={PortComponent}
      />
    );
  });
};
