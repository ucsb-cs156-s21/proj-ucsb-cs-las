import React from "react";
import useSWR from "swr";
import { Button } from "react-bootstrap";
import { fetchWithToken } from "main/utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "main/components/Loading/Loading";
import TutorTable from "main/components/Tutor/TutorTable";
import {
  buildCreateTutor,
  buildDeleteTutor,
  buildUpdateTutor
} from "main/services/Tutor/TutorService";

import { useHistory } from "react-router-dom";

const Tutor = () => {
  const history = useHistory();
  const { getAccessTokenSilently: getToken } = useAuth0();
  const { data: roleInfo } = useSWR(["/api/myRole", getToken], fetchWithToken);
  const { data: tutorList, error, mutate: mutateTutors } = useSWR(
    ["/api/public/tutors", getToken],
    fetchWithToken
  );

  if (error) {
    return (
      <h1>We encountered an error; please reload the page and try again.</h1>
    );
  }
  if (!tutorList) {
    return <Loading />;
  }
  const deleteTutor = buildDeleteTutor(getToken, mutateTutors);
  const isAdmin = roleInfo && roleInfo.role.toLowerCase() == "admin";

  return (
    <>
      {isAdmin && (
        <Button onClick={() => history.push("/tutors/new")}>New Tutor</Button>
      )}
      <TutorTable
        tutors={tutorList}
        admin={isAdmin}
        deleteTutor={deleteTutor}
      />
    </>
  );
};

export default Tutor;
