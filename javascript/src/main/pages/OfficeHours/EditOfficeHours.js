import React from "react";
import OfficeHourForm from "main/components/OfficeHours/OfficeHourForm";
import { fetchWithToken } from "main/utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";
import { buildUpdateOfficeHour } from "main/services/OfficeHours/OfficeHourService";
import { useParams,useHistory } from "react-router-dom";
import { useToasts } from 'react-toast-notifications'
import useSWR, { cache } from "swr";



const EditOfficeHours = () => {
  const history = useHistory();
  const { addToast } = useToasts();
  const { getAccessTokenSilently: getToken } = useAuth0();
  const { officehoursID } = useParams();

  const { data: officehours } = useSWR(
    [`/api/public/officeHours/${officehoursID}`, getToken],
    fetchWithToken
  );


  const updateOfficeHour = buildUpdateOfficeHour(
    getToken,
    () => {
      history.push("/officehours");
      addToast("Office Hour Edited", { appearance: 'success' });
    },
    () => {
      addToast("Error editing office hour", { appearance: 'error' });
    }
  );

  return (
    <>
      <h1>Edit Existing Office Hour</h1>
      <OfficeHourForm updateOfficeHour = {updateOfficeHour} existingOfficeHour = {officehours}/>
    </>
  );
};

export default EditOfficeHours;
