import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import "./Settings.css";

export default class Settings extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="Settings">

        <Link to="/settings/email">
          <LoaderButton block
            bsSize="large"
            text="Change Email"
          >
            Change Email
          </LoaderButton>
        </Link>


        <Link to="/settings/password">
          <LoaderButton block
            bsSize="large"
            text="Change Password">
            Change Password
          </LoaderButton>
        </Link>

      </div>
    );
  }
}