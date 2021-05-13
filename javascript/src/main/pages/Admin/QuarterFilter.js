import React from "react";
import { buildUpsertFilter } from "main/services/QuarterFilterService";
import { useHistory } from "react-router-dom";
import { useToasts } from 'react-toast-notifications'
import QuarterFilterForm from "../../components/Courses/QuarterFilterForm";
import { useAuth0 } from "@auth0/auth0-react";



const QuarterFilter = () => {
  const { getAccessTokenSilently: getToken } = useAuth0();
  const { addToast } = useToasts();
  const history = useHistory();
  const upsertFilter = buildUpsertFilter(getToken,
    () => {
      history.push("/");
      addToast("New filter Saved", { appearance: 'success' });
    },
    () => {
      addToast("Error saving filter", { appearance: 'error' });
    });


  return (
    <>
      <p>
      On this page, users with admin access can choose a quarter.  Whatever quarter the admin chooses, on the home page of the app, only courses for that quarter will be shown.    That is the only page of information available to users that don't log in to the app.
      </p>
      <QuarterFilterForm upsertFilter={upsertFilter}/>
    </>
  );
};

export default QuarterFilter;
