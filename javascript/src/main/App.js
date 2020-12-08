import React from "react";
import "main/App.css";
import Loading from "main/components/Loading/Loading";
import AppNavbar from "main/components/Nav/AppNavbar";
import AuthorizedRoute from "main/components/Nav/AuthorizedRoute";
import { useAuth0 } from "@auth0/auth0-react";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import AppFooter from "main/components/Footer/AppFooter";
import About from "main/pages/About/About";
import Home from "main/pages/Home/Home";
import Profile from "main/pages/Profile/Profile";
import Courses from "main/pages/Courses/Courses";
import TutorAssignment from "main/pages/TutorAssignment/TutorAssignment";
import PrivateRoute from "main/components/Auth/PrivateRoute";
import Admin from "main/pages/Admin/Admin";
import useSWR from "swr";
import EditCourse from "main/pages/Courses/EditCourse";
import NewCourse from "main/pages/Courses/NewCourse";

import Tutor from "main/pages/Tutor/Tutor";
import EditTutor from "main/pages/Tutor/EditTutor";
import NewTutor from "main/pages/Tutor/NewTutor";

import NewTutorAssignment from "main/pages/TutorAssignment/NewTutorAssignment";
import { fetchWithToken } from "main/utils/fetch";

function App() {
  const { isLoading, getAccessTokenSilently: getToken } = useAuth0();
  const { data: roleInfo } = useSWR(["/api/myRole", getToken], fetchWithToken);
  const isAdmin = roleInfo && roleInfo.role.toLowerCase() === "admin";

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <AppNavbar />
      <Container className="flex-grow-1 mt-5">
        <Switch>
          <Route path="/" exact component={Home} />
          <PrivateRoute path="/profile" component={Profile} />
          <AuthorizedRoute
            path="/admin"
            component={Admin}
            authorizedRoles={["admin"]}
          />
          <AuthorizedRoute
            path="/courses"
            exact
            component={Courses}
            authorizedRoles={["admin"]}
          />
          <AuthorizedRoute
            path="/courses/new"
            exact
            component={NewCourse}
            authorizedRoles={["admin"]}
          />
          <AuthorizedRoute
            path="/courses/edit/:courseId"
            exact
            component={EditCourse}
            authorizedRoles={["admin"]}
          />

          <AuthorizedRoute
            path="/tutors"
            exact
            component={Tutor}
            authorizedRoles={["admin", "member"]}
          />
          <AuthorizedRoute
            path="/tutors/new"
            exact
            component={NewTutor}
            authorizedRoles={["admin", "member"]}
          />
          <AuthorizedRoute
            path="/tutors/edit/:tutorId"
            exact
            component={EditTutor}
            authorizedRoles={["admin"]}
          />
          <AuthorizedRoute
            path="/tutorAssignment"
            exact
            component={TutorAssignment}
            authorizedRoles={["admin", "member"]}
          />
          <AuthorizedRoute
            path="/tutorAssignment/new"
            exact
            component={NewTutorAssignment}
            authorizedRoles={["admin", "member"]}
          />
          <Route path="/about" component={About} />
        </Switch>
      </Container>
      <AppFooter />
    </div>
  );
}

export default App;
