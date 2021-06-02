import React from "react";
import TutorNotesForm from "main/components/TutorNotes/TutorNotesForm";
import { useAuth0 } from "@auth0/auth0-react";
import { buildCreateTutorNotes } from "main/services/TutorNotes/TutorNotesService";
import { useHistory } from "react-router-dom";
import { useToasts } from 'react-toast-notifications'



const NewTutorNotes = () => {
  const history = useHistory();

  const { addToast } = useToasts();

  const { getAccessTokenSilently: getToken } = useAuth0();

  const createTutorNotes = buildCreateTutorNotes(
    getToken,
    () => { 
      history.push("/tutorNotes"); 
      addToast("New Tutor Notes Saved", { appearance: 'success' });
    },
    () => {
      addToast("Error saving Tutor Notes", { appearance: 'error' });
    }
  );

  return (
    <>
      <h1>Add New Tutor Notes</h1>
      <TutorNotesForm createTutorNotes={createTutorNotes} />
    </>
  );
};

export default NewTutorNotes;