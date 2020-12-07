import React from "react";
import TutorHistorySearch from "main/components/Tutors/TutorHistorySearch";
import { useAuth0 } from "@auth0/auth0-react";
import { buildTutorSearch } from "main/services/Tutors/TutorService";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

const TutorHistory = () => {
  const { addToast } = useToasts();
  const history = useHistory();
  const {getAccessTokenSilently: getToken } = useAuth0();
  const tutorSearch = buildTutorSearch(
    getToken,
    () => {
      // onSuccess
      history.push("/admin/tutorhistory/searchresults");
      addToast("Search success", { appearance: "success" });
    },
    () => {
      // onError
      addToast("Error searching for tutor", { appearance: "error"});
    }
  );



  return (
    <>
      <h1>Search for a Tutor</h1>
      <TutorHistorySearch tutorSearch={tutorSearch} />
    </>
  );
};

export default TutorHistory;