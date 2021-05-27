  
import React from "react";
import useSWR, { cache } from "swr";
import TutorNotesForm from "main/components/TutorNotes/TutorNotesForm";
import { fetchWithToken } from "main/utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "main/components/Loading/Loading";
import { useParams, useHistory } from "react-router-dom";
import { buildUpdateTutorNotes } from "main/services/TutorNotes/TutorNotesService";
import { useToasts } from 'react-toast-notifications'


const EditTutorNotes = () => {
  const { addToast } = useToasts();
  const history = useHistory();
  const { tutorNotesId } = useParams();
  const { getAccessTokenSilently: getToken } = useAuth0();
  const updateTutorNotes = buildUpdateTutorNotes(
    getToken, 
    () => { 
      history.push("/tutorNotes"); 
      addToast("Tutor Notes updated", { appearance: 'success' });
    }, 
    () => { 
      addToast("Error updating tutor Notes", { appearance: 'error' });
    }
  );

  cache.clear();
  
  const { data: tutorNotes } = useSWR(
    [`/api/member/tutorNotes/${tutorNotesId}`, getToken],
    fetchWithToken
  );

  return (
    <>
      <h1>Edit Tutor Notes</h1>
      {
        tutorNotes ?
          <TutorNotesForm updateTutorNotes={updateTutorNotes} existingTutorNotes={tutorNotes} /> :
          <Loading />
      }
    </>
  );
};

export default EditTutorNotes;