import React from "react";
import { Router } from "../../routes";

import { Formik, Form } from "formik";
import { renderFormFields, validateForm } from "../../helpers/portfolio_uitls";

import { Alert, Button, FormGroup } from "reactstrap";

const PortfolioCreateForm = ({
  initialValues,
  onSubmit,
  error,
  submitButtonText,
  frompage
}) => {
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validate={validateForm}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {renderFormFields(initialValues, frompage)}
            {error && <Alert color="danger">{error}</Alert>}
            <FormGroup>
              <Button
                color="success"
                size="lg"
                type="submit"
                disabled={isSubmitting}
              >
                {submitButtonText}
              </Button>{" "}
              <Button
                onClick={() => Router.pushRoute("/portfolios")}
                color="secondary"
                size="lg"
                type="submit"
              >
                Cancel
              </Button>
            </FormGroup>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PortfolioCreateForm;
