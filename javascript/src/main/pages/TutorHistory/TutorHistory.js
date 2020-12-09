import React from "react";
import { buildSearchTutorHistoryByCourse } from "main/services/TutorHistory/TutorHistoryService";
import TutorHistoryForm from "main/components/TutorHistory/TutorHistoryForm";
import TutorAssignmentTable from "main/components/TutorAssignment/TutorAssignmentTable";
import { useAuth0 } from "@auth0/auth0-react"; 
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

const TutorHistory = () => {
  const { addToast } = useToasts();
  const history = useHistory();
  const { getAccessTokenSilently: getToken } = useAuth0();
  let showResults = false; // flag for whether to display table component
  let tutorAssignmentList = null;
  const searchTutorHistoryByCourse = buildSearchTutorHistoryByCourse(
    getToken,
    (data) => {
      // onSuccess
      // update the table component
      tutorAssignmentList = data;
      showResults = true;
      addToast("Search success", { appearance: "success" });
    },
    (err) => {
      // onError
      showResults = false;
      addToast(`Error finding tutors for course: ${err}`, { appearance: "error" });
    }
  );



  return (
    <>
      <h1>Search for Tutors by Course</h1>
      <TutorHistoryForm searchTutorHistoryByCourse={searchTutorHistoryByCourse} />
      { showResults && <TutorAssignmentTable tutorAssignments={tutorAssignmentList} isInstructor={true} /> }
    </>
  );
};

export default TutorHistory;