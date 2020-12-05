import React from "react";
import CourseForm from "main/components/Courses/QuarterFilterForm";
import { buildUpsertFilter, buildDeleteFilter } from "main/services/QuarterFilterService";
import { useHistory } from "react-router-dom";
import { useToasts } from 'react-toast-notifications'
import QuarterFilterForm from "../components/Courses/QuarterFilterForm";
import useSWR, { cache } from "swr";
import { fetchWithToken } from "main/utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "main/components/Loading/Loading";
import { Toast } from "react-bootstrap";



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
  const {data: active, error} = useSWR("api/public/filter",fetchWithToken)

  const deleteFilter = buildDeleteFilter(getToken,
    () => {
      history.push("/");
      addToast("Filter deleted", { appearance: 'success' });
    },
    () => {
      addToast("no active quarter existent", { appearance: 'error' });
    });
    if (error) {
      return (
        <h1>We encountered an error; please reload the page and try again.</h1>
      );
    }


  return (
    <>
      <QuarterFilterForm upsertFilter={upsertFilter} deleteFilter={deleteFilter} />
    </>
  );
};

export default QuarterFilter;
