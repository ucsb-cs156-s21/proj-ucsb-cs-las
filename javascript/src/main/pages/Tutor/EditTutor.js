import React from "react";
import useSWR, { cache } from "swr";
import TutorForm from "main/components/Tutor/TutorForm";
import { fetchWithToken } from "main/utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "main/components/Loading/Loading";
import { useParams, useHistory } from "react-router-dom";
import { buildUpdateTutor } from "main/services/Tutor/TutorService";
import { useToasts } from "react-toast-notifications";

const EditTutor = () => {
  const { addToast } = useToasts();
  const history = useHistory();
  const { tutorId } = useParams();
  const { getAccessTokenSilently: getToken } = useAuth0();
  const updateTutor = buildUpdateTutor(
    getToken,
    () => {
      history.push("/tutors");
      addToast("Tutor updated", { appearance: "success" });
    },
    () => {
      addToast("Error saving tutor", { appearance: "error" });
    }
  );

  cache.clear();
  const { data: tutor } = useSWR(
    [`/api/member/tutors/${tutorId}`, getToken],
    fetchWithToken
  );

  return (
    <>
      <h1>Edit Tutor</h1>
      {tutor ? (
        <TutorForm updateTutor={updateTutor} existingTutor={tutor} />
      ) : (
        <Loading />
      )}
    </>
  );
};

export default EditTutor;
