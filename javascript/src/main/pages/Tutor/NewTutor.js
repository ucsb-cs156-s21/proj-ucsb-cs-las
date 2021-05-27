import React from "react";
import TutorForm from "main/components/Tutor/TutorForm";
import { useAuth0 } from "@auth0/auth0-react";
import { buildCreateTutor } from "main/services/Tutor/TutorService";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

const NewTutor = () => {
  const history = useHistory();

  const { addToast } = useToasts();

  const { getAccessTokenSilently: getToken } = useAuth0();

  const createTutor = buildCreateTutor(
    getToken,
    () => {
      history.push("/tutors");
      addToast("New Tutor Saved", { appearance: "success" });
    },
    () => {
      addToast("Error saving tutor", { appearance: "error" });
    }
  );

  return (
    <>
      <h1>Add New Tutor</h1>
      <TutorForm createTutor={createTutor} />
    </>
  );
};

export default NewTutor;
