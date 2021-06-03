import React from "react";
import useSWR from "swr";
import { Button } from "react-bootstrap";
import { fetchWithToken } from "main/utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "main/components/Loading/Loading";
import TutorNotesTable from "main/components/TutorNotes/TutorNotesTable"
import { buildDeleteTutorNotes } from "../../services/TutorNotes/TutorNotesService";
import { useToasts } from "react-toast-notifications";


import {useHistory} from "react-router-dom";


const TutorNotes = () => {
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

  const isInstructor = roleInfo && roleInfo.role && instructorCourseList && (instructorCourseList.length > 0);

  const isAdmin = roleInfo && roleInfo.role && roleInfo.role.toLowerCase() === "admin";

  const { data: tutorNotesList, error, mutate: mutateTutorNotes } = useSWR(
    ["/api/member/tutorNotes", getToken],
    fetchWithToken
  );

  const deleteTutorNotes = buildDeleteTutorNotes(
    getToken,
    () => {
      mutateTutorNotes();
      addToast("CSV Uploaded", { appearance: "success" });
    },
    () => {
      addToast("Error Uploading CSV", { appearance: "error" });
    }
    );

  const newTutorNotesButton = <Button className="mb-3" onClick={()=>history.push("/tutorNotes/new")}>New Tutor Notes</Button>;

  console.log("tutorNotesList in TutorNotes.js: ", tutorNotesList);

  if (error) {
    return (
      <>
        {newTutorNotesButton}
        <h1>You have no current Tutor Notes or we encountered an error; please reload the page and try again.</h1>
      </>
    );
  }
  if (!tutorNotesList) {
    return <Loading />;
  }

  return (
    <>
      {(newTutorNotesButton)}
      <TutorNotesTable tutorNotes={tutorNotesList} isInstructor={isInstructor || isAdmin} deleteTutorNotes={deleteTutorNotes}/>
    </>
  );
};

export default TutorNotes;