import React from "react";
import useSWR from "swr";
import { Button } from "react-bootstrap";
import { fetchWithToken } from "main/utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "main/components/Loading/Loading";
import TutorAssignmentTable from "main/components/TutorAssignment/TutorAssignmentTable"
import { buildDeleteTutorAssignment } from "main/services/TutorAssignment/TutorAssignmentService";
import {useHistory} from "react-router-dom";
import { useToasts } from 'react-toast-notifications'
import { fetchWithoutToken } from "main/utils/fetch";


const TutorAssignment = () => {
  const history = useHistory();
  const { user, getAccessTokenSilently: getToken } = useAuth0();
  const { email } = user;
  const { addToast } = useToasts();

  const { data: roleInfo } = useSWR(
      ["/api/myRole", getToken],
      fetchWithToken
  );

  const { data: instructorCourseList } = useSWR(
    [`/api/member/courses/forInstructor/${email}`, getToken],
    fetchWithToken
  );

  const isInstructor = roleInfo && roleInfo.role && instructorCourseList && (instructorCourseList.length > 0 || roleInfo.role.toLowerCase() === "admin");
  const { data: tutorAssignmentList, error} = useSWR(
    ["/api/member/tutorAssignments", getToken],
    fetchWithToken
  );

  const deleteTutorAssignment = buildDeleteTutorAssignment(getToken, 
    () => { 
      addToast("Tutor Assignment deleted", { appearance: 'success' });
    }, 
    () => { 
      addToast("Error deleting tutor assignment", { appearance: 'error' });
    }
  );


  if (error) {
    return (
      <>
        {isInstructor && <Button style={{marginBottom: "1em"}} onClick={()=>history.push("/tutorAssignments/new")}>New Tutor Assignment</Button>}
        <h1>You have no current Tutor Assignments or we encountered an error; please reload the page and try again.</h1>
      </>
    );
  }
  if (!tutorAssignmentList) {
    return <Loading />;
  }

  return (
    <>
      {isInstructor && <Button style={{marginBottom: "1em"}} onClick={()=>history.push("/tutorAssignments/new")}>New Tutor Assignment</Button>}
      <TutorAssignmentTable tutorAssignments={tutorAssignmentList} isInstructor={isInstructor} deleteTutorAssignment={deleteTutorAssignment}/>
    </>
  );
};

export default TutorAssignment;