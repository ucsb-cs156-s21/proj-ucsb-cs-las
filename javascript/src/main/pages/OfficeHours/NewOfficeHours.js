import React from "react";
import OfficeHourForm from "main/components/OfficeHours/OfficeHourForm";
import { useAuth0 } from "@auth0/auth0-react";
import { buildCreateOfficeHour } from "main/services/OfficeHours/OfficeHourService";
import { useHistory } from "react-router-dom";
import { useToasts } from 'react-toast-notifications'



const NewOfficeHour = () => {
  const history = useHistory();
  
  const { addToast } = useToasts();

  const { getAccessTokenSilently: getToken } = useAuth0();

  const createOfficeHour = buildCreateOfficeHour(
    getToken,
    () => { 
      history.push("/officehours"); 
      addToast("New Office Hour Saved", { appearance: 'success' });
    }, 
    () => { 
      addToast("Error saving office hour", { appearance: 'error' });
    }
  );

  return (
    <>
      <h1>Add New Office Hour</h1>
      <OfficeHourForm createOfficeHour={createOfficeHour} />
    </>
  );
};

export default NewOfficeHour;