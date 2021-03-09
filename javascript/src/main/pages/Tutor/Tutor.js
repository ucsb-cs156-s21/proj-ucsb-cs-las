import React from "react";
import { useEffect } from "react";
import useSWR from "swr";
import { Button } from "react-bootstrap";
import { fetchWithToken } from "main/utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "main/components/Loading/Loading";
import TutorTable from "main/components/Tutor/TutorTable";
import { TutorCSVButton } from "./TutorCSVButton"; 
import { useToasts } from "react-toast-notifications";

import {
  //buildCreateTutor,
  buildDeleteTutor
  //buildUpdateTutor
} from "main/services/Tutor/TutorService";

import { useHistory } from "react-router-dom";
import { uploadTutorsCSV } from "../../services/Tutor/TutorService";

const { addToast } = useToasts();

const Tutor = () => {
  const { user, getAccessTokenSilently: getToken } = useAuth0();
  const { email } = user;
  const history = useHistory();
  const { data: roleInfo } = useSWR(["/api/myRole", getToken], fetchWithToken);

  const { data: tutorList, error, mutate: mutateTutors } = useSWR(
    ["/api/member/tutors", getToken],
    fetchWithToken
  );

  const {
    data: instructorTutorList,
    errorInstructor,
    mutate: mutateInstructorTutors
  } = useSWR(["/api/member/instructorTutors", getToken], fetchWithToken);

  useEffect(() => {
    mutateTutors();
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
  if (!tutorList) {
    return <Loading />;
  }

  const deleteTutor = buildDeleteTutor(getToken, mutateTutors);

  const uploadTutors = uploadTutorsCSV(getToken,
    () => {
      mutateTutors(); 
      addToast("CSV Uploaded", { appearance: "success" });
    },
    () => {
      addToast("Error Uploading CSV", { appearance: "error" });
    }
  );

  return (
    <>
      <Button
        data-testid={`new-tutor-button`}
        onClick={() => history.push("/tutors/new")}
      >
        New Tutor
      </Button>
      <TutorCSVButton admin={isAdmin} addTask={uploadTutors} />
      <pre style={{whiteSpace: 'pre', textAlign: 'left', width: 'auto', marginLeft: 'auto', marginRight: 'auto', padding: '0em'}} muted>
      Required Columns: firstName, lastName, email.  Ex: joe, gaucho, joegaucho@ucsb.edu
      </pre>

      <TutorTable
        tutors={tutorList}
        instructorTutors={instructorTutorList}
        admin={isAdmin}
        deleteTutor={deleteTutor}
        />
    </>
  );
};

export default Tutor;