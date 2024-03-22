import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { useAuth } from "../AuthContext";

const NavigationBar = () => {
  const { isLoggedIn, user } = useAuth();

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to={isLoggedIn ? "/dashboard" : "/"}>
        Hospital OPD
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* <Nav.Link as={Link} to="/">
            Home
          </Nav.Link> */}
          {isLoggedIn && (
            <>
              <Nav.Link as={Link} to="dashboard">
                Dashboard
              </Nav.Link>
              {user.permission.patient.view && (
                <Nav.Link as={Link} to="/patients">
                  Patients
                </Nav.Link>
              )}
              {user.permission.visit.view && (
                <Nav.Link as={Link} to="/visits">
                  Visits
                </Nav.Link>
              )}
              {user.role == "doctor" && (
                <Nav.Link as={Link} to="/users">
                  Users
                </Nav.Link>
              )}
              <Nav.Link as={Link} to="/logout">
                Logout
              </Nav.Link>
            </>
          )}
          {!isLoggedIn && (
            <>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              {/* <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link> */}
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
