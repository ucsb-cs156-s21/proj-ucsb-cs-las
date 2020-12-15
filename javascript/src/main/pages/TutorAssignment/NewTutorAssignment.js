import React from "react";
import TutorAssignmentForm from "main/components/TutorAssignment/TutorAssignmentForm";
import { useAuth0 } from "@auth0/auth0-react";
import { buildCreateTutorAssignment } from "main/services/TutorAssignment/TutorAssignmentService";
import { useHistory } from "react-router-dom";
import { useToasts } from 'react-toast-notifications'



const NewTutorAssignment = () => {
  const history = useHistory();

  const { addToast } = useToasts();

  const { getAccessTokenSilently: getToken } = useAuth0();

  const createTutorAssignment = buildCreateTutorAssignment(
    getToken,
    () => { 
      history.push("/tutorAssignments"); 
      addToast("New Tutor Assignment Saved", { appearance: 'success' });
    },
    () => {
      addToast("Error saving Tutor Assignment. Make sure tutor email is correct", { appearance: 'error' });
    }
  );

  return (
    <>
      <h1>Add New Tutor Assignment</h1>
      <TutorAssignmentForm createTutorAssignment={createTutorAssignment} />
    </>
  );
};

export default NewTutorAssignment;
