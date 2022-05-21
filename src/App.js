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
    !isAuthenticating && <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Scratch</Link>
          </Navbar.Brand>
        </Navbar.Header>
        {
          isAuthenticated ? <>
            <Link to="/settings">
              <NavItem>Settings</NavItem>
            </Link>
            <NavItem onClick={handleLogout}>Logout</NavItem>
          </> :
            <Nav pullRight>
              <Link to="/signup">
                Signup
              </Link>
              <Link to="/login">
                Login
              </Link>
            </Nav>
        }

      </Navbar>

      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated, user, token }}>
        <Routes />
      </AppContext.Provider>

    </div>
  );
}

export default App
