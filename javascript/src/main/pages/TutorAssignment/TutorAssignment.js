import React from "react";
import useSWR from "swr";
import { Button } from "react-bootstrap";
import { fetchWithToken } from "main/utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "main/components/Loading/Loading";
import TutorAssignmentTable from "main/components/TutorAssignment/TutorAssignmentTable"
import { buildCreateTutorAssignment, buildDeleteTutorAssignment, buildUpdateTutorAssignment } from "main/services/TutorAssignment/TutorAssignmentService";

import {useHistory} from "react-router-dom";


const TutorAssignment = () => {
  const history = useHistory();
  const { getAccessTokenSilently: getToken } = useAuth0();

  const { data: roleInfo } = useSWR(
    ["/api/myRole", getToken],
    fetchWithToken
  );
  const isInstructor = roleInfo && (roleInfo.role.toLowerCase() === "instructor" || roleInfo.role.toLowerCase() === "admin");

  const { data: tutorAssignmentList, error, mutate: mutateTutorAssignment } = useSWR(
    ["/api/public/tutorAssignments/", getToken],
    fetchWithToken
  );

  
  if (error) {
    return (
      <>
        {isInstructor && <Button onClick={()=>history.push("/tutorAssignment/new")}>New Tutor Assignment</Button>}
        <h1>We encountered an error; please reload the page and try again.</h1>
      </>
    );
  }
  if (!tutorAssignmentList) {
    return <Loading />;
  }
  const deleteTutorAssignment = buildDeleteTutorAssignment(getToken, mutateTutorAssignment);

  return (
    <>
      {isInstructor && <Button onClick={()=>history.push("/tutorAssignment/new")}>New Tutor Assignment</Button>}
      <TutorAssignmentTable courses={tutorAssignmentList} instructor={isInstructor}/>
    </>
  );
};

export default TutorAssignment;