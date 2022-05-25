import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { Link, useHistory } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import "./Login.css";

export default function Login() {

  const history = useHistory();

  const { userHasAuthenticated } = useAppContext();

  const [isLoading, setIsLoading] = useState(false);

  const [fields, handleFieldChange] = useFormFields({
    email: "yatogamidev@gmail.com",
    password: "4e@NAt@Z24u3z6gXAsG9T^L7XkdT"
  });

  function validateForm() {
    return fields.email.length > 0 &&
      fields.password.length > 0;
  }

  async function handleSubmit(event) {

    event.preventDefault();
    setIsLoading(true);

    try {
      await Auth.signIn(fields.email, fields.password);
      userHasAuthenticated(true);
      history.push("/");
    } catch (e) {

      if (e.code === "UserNotConfirmedException") {
        history.push("/account/confirmation-code", { ...fields });
      }

      setIsLoading(false);
    }
  }


  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>

        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </FormGroup>

        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </FormGroup>

        <Link to="/login/reset">Forgot password?</Link>

        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
      </form>
    </div>
  );
}