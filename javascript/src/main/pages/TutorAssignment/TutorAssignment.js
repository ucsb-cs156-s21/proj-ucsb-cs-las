import React from "react";
import useSWR from "swr";
import { Button } from "react-bootstrap";
import { fetchWithToken } from "main/utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "main/components/Loading/Loading";
import TutorAssignmentTable from "main/components/TutorAssignment/TutorAssignmentTable"

import {useHistory} from "react-router-dom";


const TutorAssignment = () => {
  const history = useHistory();
  const { user, getAccessTokenSilently: getToken } = useAuth0();
  const { name, picture, email } = user;

  const { data: roleInfo } = useSWR(
      ["/api/myRole", getToken],
      fetchWithToken
  );

  const { data: instructorCourseList } = useSWR(
    [`/api/member/courses/forInstructor/${email}`, getToken],
    fetchWithToken
  );

  const isInstructor = roleInfo && roleInfo.role && (instructorCourseList || roleInfo.role.toLowerCase() === "admin");

  const { data: tutorAssignmentList, error, mutate: mutateTutorAssignment } = useSWR(
    ["/api/member/tutorAssignments", getToken],
    fetchWithToken
  );
  
  if (error) {
    return (
      <>
        {isInstructor && <Button onClick={()=>history.push("/tutorAssignment/new")}>New Tutor Assignment</Button>}
        <h1>You have no current Tutor Assignments or we encountered an error; please reload the page and try again.</h1>
      </>
    );
  }
  if (!tutorAssignmentList) {
    return <Loading />;
  }

  return (
    <>
      {isInstructor && <Button onClick={()=>history.push("/tutorAssignment/new")}>New Tutor Assignment</Button>}
      <TutorAssignmentTable tutorAssignments={tutorAssignmentList} isInstructor={isInstructor}/>
    </>
  );
};

export default TutorAssignment;