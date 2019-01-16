import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  INTITIAL_VALUES,
  renderFormFields,
  validateForm
} from "../../helpers/portfolio_uitls";

import { Button } from "reactstrap";

const PortfolioCreateForm = props => (
  <div>
    <Formik
      initialValues={INTITIAL_VALUES}
      validate={validateForm}
      onSubmit={props.onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          {renderFormFields()}
          <Button
            color="success"
            size="lg"
            type="submit"
            disabled={isSubmitting}
          >
            Create
          </Button>
        </Form>
      )}
    </Formik>
  </div>
);

export default PortfolioCreateForm;
