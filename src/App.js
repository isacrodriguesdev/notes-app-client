import React, { useEffect, useState } from "react";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { Auth } from "aws-amplify";
import { Link, useHistory } from "react-router-dom";
import { AppContext } from "./libs/contextLib";
import "./App.css";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";

function App() {

  const history = useHistory();

  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    history.push("/login");
  }

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      const result = await Auth.currentSession();
      setUser(result.getIdToken().payload)
      setToken(result.getIdToken().getJwtToken())
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

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
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
                    Sign Up
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

      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated, user, token }}>
        <Routes />
      </AppContext.Provider>

    </div>
  );
}

export default App
