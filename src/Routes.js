import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import NewNote from "./containers/NewNote";
import NotFound from "./containers/NotFound";
import Signup from "./containers/Signup";
import Notes from "./containers/Notes";
import Settings from "./containers/Settings";
import AuthenticatedRoute from
  "./components/AuthenticatedRoute";
import UnauthenticatedRoute from
  "./components/UnauthenticatedRoute";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import config from "./config";
import ResetPassword from "./containers/ResetPassword";
import ChangePassword from "./containers/ChangePassword";
import ChangeEmail from "./containers/ChangeEmail";
import ConfirmationCode from "./containers/ConfirmationCode";

const stripePromise = loadStripe(config.STRIPE_KEY);

export default function Routes() {

  return (
    <Switch>
      <UnauthenticatedRoute exact path="/login">
        <Login />
      </UnauthenticatedRoute>

      <UnauthenticatedRoute exact path="/signup">
        <Signup />
      </UnauthenticatedRoute>

      <UnauthenticatedRoute exact path="/account/confirmation-code">
        <ConfirmationCode />
      </UnauthenticatedRoute>

      <UnauthenticatedRoute exact path="/login/reset">
        <ResetPassword />
      </UnauthenticatedRoute>

      <AuthenticatedRoute exact path="/settings/password">
        <ChangePassword />
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path="/settings/email">
        <ChangeEmail />
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path="/settings">
        <Elements stripe={stripePromise}>
          <Settings />
        </Elements>
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path="/">
        <Home />
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path="/notes/new">
        <NewNote />
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path="/notes/:id">
        <Notes />
      </AuthenticatedRoute>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}