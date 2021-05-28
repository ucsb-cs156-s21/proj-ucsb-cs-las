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
import OfficeHours from "main/pages/OfficeHours/OfficeHours";
import NewOfficeHours from "main/pages/OfficeHours/NewOfficeHours"
import TutorAssignments from "main/pages/TutorAssignment/TutorAssignments";
import TutorAssignmentHistory from "main/pages/TutorAssignmentHistory/TutorAssignmentHistory";
import TutorHistory from "main/pages/TutorHistory/TutorHistory";
import PrivateRoute from "main/components/Auth/PrivateRoute";
import Admin from "main/pages/Admin/Admin";
import EditCourse from "main/pages/Courses/EditCourse";
import NewCourse from "main/pages/Courses/NewCourse";
import Tutor from "main/pages/Tutor/Tutor";
import EditTutor from "main/pages/Tutor/EditTutor";
import NewTutor from "main/pages/Tutor/NewTutor";
import NewTutorAssignment from "main/pages/TutorAssignment/NewTutorAssignment";
import EditTutorAssignment from "main/pages/TutorAssignment/EditTutorAssignment";
import QuarterFilter from "main/pages/Admin/QuarterFilter"
import ViewLogins from "main/pages/Admin/ViewLogins";
import CourseShow from "main/pages/Courses/CourseShow";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <AppNavbar />
      <div class="flex-wrapper">
      <Container className="flex-grow-1 mt-5">
        <Switch>
          <Route path="/" exact component={Home} />
          <PrivateRoute path="/profile" component={Profile} />
          <AuthorizedRoute path="/admin" exact component={Admin} authorizedRoles={["admin"]} />
          <AuthorizedRoute path="/admin/tutorHistory" exact component={TutorHistory} authorizedRoles={["admin"]}/> 
          <AuthorizedRoute path="/admin/tutorAssignmentHistory" exact component={TutorAssignmentHistory} authorizedRoles={["admin"]}/> 
          <AuthorizedRoute path="/admin/viewLogins" exact component={ViewLogins} authorizedRoles={["admin"]} />
          <AuthorizedRoute path="/courses" exact component={Courses} authorizedRoles={["admin"]} />
          <AuthorizedRoute path="/courses/new" exact component={NewCourse} authorizedRoles={["admin"]} />
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
            authorizedRoles={["admin", "member"]}
          />
          <AuthorizedRoute path="/courses/edit/:courseId" exact component={EditCourse} authorizedRoles={["admin"]} />
          <AuthorizedRoute path="/tutorAssignments" exact component={TutorAssignments} authorizedRoles={["admin", "member"]} />
          <AuthorizedRoute path="/tutorAssignments/new" exact component={NewTutorAssignment} authorizedRoles={["admin", "member"]} />
          <AuthorizedRoute path="/tutorAssignments/edit/:tutorAssignmentId" exact component={EditTutorAssignment} authorizedRoles={["admin", "member"]} />
          <AuthorizedRoute path="/admin/setActiveQuarter" exact component={QuarterFilter} authorizedRoles={["admin"]} />
          <AuthorizedRoute path="/officehours" exact component={OfficeHours} authorizedRoles={["admin", "member"]} />
          <AuthorizedRoute path="/officehours/new" exact component={NewOfficeHours} authorizedRoles={["admin", "member"]} />

          <Route path="/courses/show/:courseId" component={CourseShow} />
          <Route path="/about" component={About} />
        </Switch>
      </Container>
      <AppFooter />
      </div>
    </div>
  );
};

export default App;
