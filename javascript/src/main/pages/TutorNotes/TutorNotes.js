import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useSWR from "swr";
import { Button } from "react-bootstrap";
import { fetchWithToken } from "main/utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "main/components/Loading/Loading";
import TutorNotesTable from "main/components/TutorNotes/TutorNotesTable";
//import { TutorCSVButton } from "main/components/Tutor/TutorCSVButton"; 
import { useToasts } from "react-toast-notifications";
//import { buildDeleteTutor, uploadTutorsCSV } from "main/services/Tutor/TutorService";

const TutorNotes = () => {
  const { user, getAccessTokenSilently: getToken } = useAuth0();
  const { email } = user;
  const history = useHistory();
  const { data: roleInfo } = useSWR(["/api/myRole", getToken], fetchWithToken);
  const { addToast } = useToasts();

  const { data: tutorNotesList, error, mutate: mutateTutorNotes } = useSWR(
    ["/api/member/tutorNotes", getToken],
    fetchWithToken
  );

  const {
    data: instructorTutorList,
    errorInstructor,
    mutate: mutateInstructorTutors
  } = useSWR(["/api/member/instructorTutors", getToken], fetchWithToken);

  useEffect(() => {
    mutateTutorNotes();
    mutateInstructorTutors();
  }, [mutateInstructorTutors, mutateTutors]);

  const { data: instructorCourseList } = useSWR(
    [`/api/member/courses/forInstructor/${email}`, getToken],
    fetchWithToken
  );

  const isInstructor =
    roleInfo &&
    roleInfo.role &&
    instructorCourseList &&
    instructorCourseList.length > 0;

  const isAdmin =
    roleInfo && roleInfo.role && roleInfo.role.toLowerCase() === "admin";

  if (error || errorInstructor) {
    return (
      <h1>We encountered an error; please reload the page and try again.</h1>
    );
  }
  if (!tutorNotesList) {
    return <Loading />;
  }

  const deleteTutorNotes = buildDeleteTutor(getToken, mutateTutors);
  
  return (
    <>

       {(isInstructor || isAdmin) && (
        <><Button
          data-testid={`new-tutor-button`}
          onClick={() => history.push("/tutorNotes/new")}
        >
          New Tutor
        </Button>
          <pre style={{ whiteSpace: 'pre', textAlign: 'left', width: 'auto', marginLeft: 'auto', marginRight: 'auto', padding: '0em' }} muted>
            Required Columns: course, tutor, message. Ex: CS156, Mara, "you suck"
          </pre></>
      )}
      {tutorList && (isInstructor || isAdmin) && (
      <TutorNotesTable
        tutorNotes={tutorNotesList}
        instructorTutors={instructorTutorList}
        admin={isAdmin || isInstructor}
        deleteTutorNotes={deleteTutorNotes}

        />
        )}
    </>
  );
};

export default Tutor;