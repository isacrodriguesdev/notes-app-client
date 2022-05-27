import React, { useEffect, useState } from "react";
import { Auth, Hub } from "aws-amplify";
import { Link, useHistory } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import "./Login.css";
import { onError } from "../libs/errorLib";

export default function Login() {

  const history = useHistory();

  // eslint-disable-next-line
  const [user, setUser] = useState(null);

  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  const [fields, handleFieldChange] = useFormFields({
    email: "isacrodriguesdev@protonmail.com",
    password: "4e@NAt@Z24u3z6gXAsG9T^L7XkdT="
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
      } else {
        onError(e)
      }

      setIsLoading(false);
    }
  }

  useEffect(() => {

    Hub.listen('auth', ({ payload: { event, data } }) => {

      console.log("auth", event.at, data)

      // eslint-disable-next-line
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser().then(userData => setUser(userData));
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
      }
    });

    getUser().then(userData => setUser(userData));

  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then(userData => userData)
      .catch(() => console.log('Not signed in'));
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

        <hr />

        <LoaderButton
          onClick={async () => {
            try {
              await Auth.federatedSignIn({ provider: "facebook" })
            } catch (error) {
              alert(error)
              console.log(error);
            }
          }}
          block
          type="button"
          bsSize="large"
        >
          Login with facebook
        </LoaderButton>

      </form>
    </div>
  );
}