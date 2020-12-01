import React from "react";
import useSWR from "swr";
import { Button } from "react-bootstrap";
import { fetchWithToken } from "main/utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";
// import Loading from "main/components/Loading/Loading";
import TutorAssignmentTable from "main/components/TutorAssignment/TutorAssignmentTable"
// import { buildCreateCourse, buildDeleteCourse, buildUpdateCourse } from "main/services/Courses/CourseService";

// import {useHistory} from "react-router-dom";


const TutorAssignment = () => {
//   const history = useHistory();
//   const { getAccessTokenSilently: getToken } = useAuth0();
//   const { data: courseList, error, mutate: mutateCourses } = useSWR(
//     ["/api/public/courses", getToken],
//     fetchWithToken
//   );
//   if (error) {
//     return (
//       <h1>We encountered an error; please reload the page and try again.</h1>
//     );
//   }
//   if (!courseList) {
//     return <Loading />;
//   }
//   const deleteCourse = buildDeleteCourse(getToken, mutateCourses);
  const { getAccessTokenSilently: getToken } = useAuth0();
  const { data: roleInfo } = useSWR(
    ["/api/myRole", getToken],
    fetchWithToken
  );
  const isInstructor = roleInfo && (roleInfo.role.toLowerCase() === "instructor" || roleInfo.role.toLowerCase() === "admin"); 

  return (
    <>
      {isInstructor && <Button>New Tutor Assignment</Button>}
      <TutorAssignmentTable courses={[]}/>
    </>
  );
};

export default TutorAssignment;