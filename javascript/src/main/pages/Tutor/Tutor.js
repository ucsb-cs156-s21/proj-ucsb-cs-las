import React from "react";
import useSWR from "swr";
import { Button } from "react-bootstrap";
import { fetchWithToken } from "main/utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "main/components/Loading/Loading";
import TutorTable from "main/components/Tutor/TutorTable";
import { useToasts } from "react-toast-notifications";

import {
  buildCreateTutor,
  buildDeleteTutor,
  buildUpdateTutor
} from "main/services/Tutor/TutorService";

import { useHistory } from "react-router-dom";

const Tutor = () => {
  const { user, getAccessTokenSilently: getToken } = useAuth0();
  const { name, picture, email } = user;
  const history = useHistory();
  const { addToast } = useToasts();
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

  const { data: instructorCourseList } = useSWR(
    [`/api/member/courses/forInstructor/${email}`, getToken],
    fetchWithToken
  );

  const isInstructor =
    roleInfo &&
    roleInfo.role &&
    instructorCourseList &&
    instructorCourseList.length > 0;
  const isAdmin = roleInfo && roleInfo.role.toLowerCase() == "admin";

  if (error || errorInstructor) {
    return (
      <h1>We encountered an error; please reload the page and try again.</h1>
    );
  }
  if (!tutorList) {
    return <Loading />;
  }

  const deleteTutor = buildDeleteTutor(getToken, mutateTutors, () => {
    addToast("Error deleting tutor", { appearance: "error" });
  });
  return (
    <>
      {(isInstructor || isAdmin) && (
        <Button onClick={() => history.push("/tutors/new")}>New Tutor</Button>
      )}
      {instructorTutorList && (
        <TutorTable
          tutors={tutorList}
          instructorTutors={instructorTutorList}
          admin={isAdmin}
          deleteTutor={deleteTutor}
        />
      )}
    </>
  );
};

export default Tutor;
