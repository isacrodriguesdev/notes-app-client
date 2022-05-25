import "./ConfirmationCode.css"
import { Auth } from "aws-amplify";
import React, { useState } from "react"
import { ControlLabel, FormControl, FormGroup, HelpBlock } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { useFormFields } from "../libs/hooksLib";

function ConfirmationCode() {

  const history = useHistory();
  const location = useLocation();

  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  const [fields, handleFieldChange] = useFormFields({
    email: location.state.email,
    password: location.state.password,
    confirmationCode: "",
  });

  useState(() => {

    resendConfirmationCode(location.state.email)

  }, []);

  async function resendConfirmationCode(username) {
    try {
      await Auth.resendSignUp(username);
    } catch (error) {
      console.log(error)
    }
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {

      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);
      userHasAuthenticated(true);

      history.push("/");

    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="ConfirmationCode">
      <form onSubmit={handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode"
          bsSize="large">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            onChange={handleFieldChange}
            value={fields.confirmationCode}
          />
          <HelpBlock>Please check your email for the code.</HelpBlock>
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateConfirmationForm()}
        >
          Verify
        </LoaderButton>
      </form>
    </div>
  );
}

export default ConfirmationCode;