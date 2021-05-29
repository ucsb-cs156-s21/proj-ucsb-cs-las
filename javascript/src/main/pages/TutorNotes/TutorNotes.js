import React from "react";
import useSWR from "swr";
import { Button } from "react-bootstrap";
import { fetchWithToken } from "main/utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "main/components/Loading/Loading";
import TutorNotesTable from "main/components/TutorNotes/TutorNotesTable"

import {useHistory} from "react-router-dom";


const TutorNotes = () => {
  const history = useHistory();
  const { user, getAccessTokenSilently: getToken } = useAuth0();
  const { email } = user;

  const { data: roleInfo } = useSWR(
      ["/api/myRole", getToken],
      fetchWithToken
  );

  const { data: instructorCourseList } = useSWR(
    [`/api/member/courses/forInstructor/${email}`, getToken],
    fetchWithToken
  );

  const isInstructor = roleInfo && roleInfo.role && instructorCourseList && (instructorCourseList.length > 0);

  const isAdmin = roleInfo && roleInfo.role && roleInfo.role.toLowerCase() === "admin";

  const { data: tutorNotesList, error } = useSWR(
    ["/api/member/tutorNotes", getToken],
    fetchWithToken
  );

  const newTutorNotesButton = <Button className="mb-3" onClick={()=>history.push("/tutorNotes/new")}>New Tutor Notes</Button>;

  if (error) {
    return (
      <>
        {(isInstructor || isAdmin) && newTutorNotesButton}
        <h1>You have no current Tutor Notes or we encountered an error; please reload the page and try again.</h1>
      </>
    );
  }
  if (!tutorNotesList) {
    return <Loading />;
  }

  return (
    <>
      {(isInstructor || isAdmin) && (newTutorNotesButton)}
      <TutorNotesTable tutorNotes={tutorNotesList} isInstructor={isInstructor || isAdmin}/>
    </>
  );
};

export default TutorNotes;