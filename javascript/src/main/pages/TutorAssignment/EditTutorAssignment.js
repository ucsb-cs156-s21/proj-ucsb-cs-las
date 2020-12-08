import React from "react";
import useSWR, { cache } from "swr";
import TutorAssignmentForm from "main/components/TutorAssignment/TutorAssignmentForm";
import { fetchWithToken } from "main/utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "main/components/Loading/Loading";
import { useParams, useHistory } from "react-router-dom";
import { buildUpdateTutorAssignment } from "main/services/TutorAssignment/TutorAssignmentService";
import { useToasts } from 'react-toast-notifications'


const EditTutorAssignment = () => {
  const { addToast } = useToasts();
  const history = useHistory();
  const { tutorAssignmentId } = useParams();
  console.log(tutorAssignmentId);
  const { getAccessTokenSilently: getToken } = useAuth0();
  const updateTutorAssignment = buildUpdateTutorAssignment(
    getToken, 
    () => { 
      history.push("/tutorAssignments"); 
      addToast("Tutor Assignment updated", { appearance: 'success' });
    }, 
    () => { 
      addToast("Error updating tutor assignment", { appearance: 'error' });
    }
  );

  cache.clear();
  
  const { data: tutorAssignment } = useSWR(
    [`/api/member/tutorAssignments/${tutorAssignmentId}`, getToken],
    fetchWithToken
  );
  console.log(tutorAssignment);

  return (
    <>
      <h1>Edit Tutor Assignment</h1>
      {
        tutorAssignment ?
          <TutorAssignmentForm updateTutorAssignment={updateTutorAssignment} existingTutorAssignment={tutorAssignment} /> :
          <Loading />
      }
    </>
  );
};

export default EditTutorAssignment;

