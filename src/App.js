import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { Link, useHistory } from "react-router-dom";
import { AppContext } from "./libs/contextLib";
import "./App.css";
import Routes from "./Routes";
import config from "./config";

function App() {

  const history = useHistory();

  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    history.push("/login");
  }

  useEffect(() => {
    onLoad(); // eslint-disable-next-line
  }, []);

  async function onLoad() {

    loadFacebookSDK();

    try {

      const result = await Auth.currentSession();

      console.log(result)
      userHasAuthenticated(true);
    }
    catch (e) {
      if (e !== 'No current user') {
        alert("No current user");
      }
    }
    setIsAuthenticating(false);
  }

  function loadFacebookSDK() {

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: config.social.FB,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v3.1'
      });
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  return (
    !isAuthenticating &&
    <div className="App container">

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">

          <div className="collapse navbar-collapse" id="navbarButtonsExample">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Scratch
                </Link>
              </li>
            </ul>

            {
              isAuthenticated ? <>
                <div className="d-flex align-items-center">
                  <button type="button" className="btn btn-link px-3 me-2">
                    <Link to="/notes/new">
                      New Notes
                    </Link>
                  </button>
                  <button type="button" className="btn btn-link px-3 me-2">
                    <Link to="/settings">
                      Settings
                    </Link>
                  </button>
                  <button type="button" className="btn btn-primary me-3" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </> : <div className="d-flex align-items-center">
                <button type="button" className="btn btn-link px-3 me-2">
                  <Link to="/login">
                    Login
                  </Link>
                </button>
                <button type="button" className="btn btn-primary me-3">
                  <Link to="/signup">
                    Sign Up
                  </Link>
                </button>
              </div>
            }


          </div>

        </div>

      </nav>

      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Routes />
      </AppContext.Provider>

    </div>
  );
}

export default App
