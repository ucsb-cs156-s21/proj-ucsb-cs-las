import React from "react";
import useSWR, { cache } from "swr";
import OfficeHourForm from "main/components/OfficeHours/OfficeHourForm";
import { fetchWithToken } from "main/utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "main/components/Loading/Loading";
import { useParams, useHistory } from "react-router-dom";
import { buildUpdateOfficeHour } from "main/services/OfficeHours/OfficeHourService";
import { useToasts } from 'react-toast-notifications'


const EditOfficeHours = () => {
  const { addToast } = useToasts();
  const history = useHistory();
  const { officeHourId } = useParams();
  const { getAccessTokenSilently: getToken } = useAuth0();
  const updateOfficeHour = buildUpdateOfficeHour(
    getToken, 
    () => { 
      history.push("/officeHours"); 
      addToast("Office Hour updated", { appearance: 'success' });
    }, 
    () => { 
      addToast("Error updating office hour", { appearance: 'error' });
    }
  );

  cache.clear();
  
  const { data: officeHour } = useSWR(
    [`/api/public/officeHours/${officeHourId}`, getToken],
    fetchWithToken
  );

  return (
    <>
      <h1>Edit Office Hour</h1>
      {
        officeHour ?
          <OfficeHourForm updateOfficeHour={updateOfficeHour} existingOfficeHour={officeHour} /> :
          <Loading />
      }
    </>
  );
};

export default EditOfficeHours;