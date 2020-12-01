import React from "react";
import useSWR from "swr";
import { Button } from "react-bootstrap";
import { fetchWithToken } from "main/utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "main/components/Loading/Loading";
import TutorAssignmentTable from "main/components/TutorAssignment/TutorAssignmentTable"
// import { buildCreateCourse, buildDeleteCourse, buildUpdateCourse } from "main/services/Courses/CourseService";

import {useHistory} from "react-router-dom";


const TutorAssignment = () => {
  const history = useHistory();
  const { getAccessTokenSilently: getToken } = useAuth0();

  const { data: roleInfo } = useSWR(
    ["/api/myRole", getToken],
    fetchWithToken
  );
  const isInstructor = roleInfo && (roleInfo.role.toLowerCase() === "instructor" || roleInfo.role.toLowerCase() === "admin");
  const isAdmin =  roleInfo && roleInfo.role.toLowerCase() === "admin";

  const { data: tutorAssignmentList, error, mutate: mutateTutorAssignment } = useSWR(
    ["/api/public/tutorAssignments", getToken],
    fetchWithToken
  );

  // tutorAssignmentList = [];
  // if(isAdmin){
  // }
  // else if(isInstructor){
  //   const { data: tutorAssignmentList, error, mutate: mutateTutorAssignment } = useSWR(
  //     [`/api/instructor/tutorAssignments/${courseId}`, getToken],
  //     fetchWithToken
  //   );
  // }
  // else{
  //   const { data: tutorAssignmentList, error, mutate: mutateTutorAssignment } = useSWR(
  //     [`/api/member/tutorAssignments/${id}`, getToken],
  //     fetchWithToken
  //   );
  // }

  if (error) {
    return (
      <h1>We encountered an error; please reload the page and try again.</h1>
    );
  }
  if (!tutorAssignmentList) {
    return <Loading />;
  }
  // const deleteCourse = buildDeleteCourse(getToken, mutateCourses);

  return (
    <>
      {isInstructor && <Button>New Tutor Assignment</Button>}
      <TutorAssignmentTable courses={[]} instructor={isInstructor}/>
    </>
  );
};

export default TutorAssignment;