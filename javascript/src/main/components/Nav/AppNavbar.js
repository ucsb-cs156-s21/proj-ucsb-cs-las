import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AuthNav from "main/components/Nav/AuthNav";
import ProfileNav from "main/components/Nav/ProfileNav";
import useSWR from "swr";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchWithToken } from "main/utils/fetch";


function AppNavbar() {
  const { getAccessTokenSilently: getToken } = useAuth0();
  const { data: roleInfo } = useSWR(
    ["/api/myRole", getToken],
    fetchWithToken
  );

  const isAdmin = roleInfo && roleInfo.role.toLowerCase() === "admin";
  const isMember = roleInfo && (roleInfo.role.toLowerCase() === "member" || roleInfo.role.toLowerCase() === "admin");

  return (
    <Navbar bg="dark" variant="dark">
      <LinkContainer to={""}>
        <Navbar.Brand data-testid="brand">UCSB CS LAs</Navbar.Brand>
      </LinkContainer>
      <Nav>
        { isAdmin &&
          <NavDropdown title="Admin">
            <NavDropdown.Item href="/admin">Admin Panel</NavDropdown.Item>
            <NavDropdown.Item href="/admin/viewLogins">View Logins</NavDropdown.Item>
          </NavDropdown>
        }
        <LinkContainer to={"/about"}>
          <Nav.Link>About</Nav.Link>
        </LinkContainer>
        {isAdmin &&
          <LinkContainer to={"/courses"}>
            <Nav.Link>Courses</Nav.Link>
          </LinkContainer>
        }
        {isAdmin &&
          <LinkContainer to={"/setActiveQuarter"}>
            <Nav.Link>SetActiveQuarter</Nav.Link>
          </LinkContainer>
        }
        { isMember &&
          (<LinkContainer to={"/tutorAssignment"}>
            <Nav.Link>Tutor Assignment</Nav.Link>
          </LinkContainer>)
        }
        <ProfileNav />
      </Nav>
      <Navbar.Collapse className="justify-content-end">
        <AuthNav />
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AppNavbar;
