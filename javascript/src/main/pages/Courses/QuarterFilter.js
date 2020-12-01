import React from "react";
import CourseForm from "main/components/Courses/QuarterFilterForm";
import { buildUpsertFilter, buildDeleteFilter } from "main/services/Courses/QuarterFilterService";
import { useHistory } from "react-router-dom";
import { useToasts } from 'react-toast-notifications'
import QuarterFilterForm from "../../components/Courses/QuarterFilterForm";
import useSWR, { cache } from "swr";
import { fetchWithToken } from "main/utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "main/components/Loading/Loading";
import { Toast } from "react-bootstrap";



const QuarterFilter = () => {
  const { getAccessTokenSilently: getToken } = useAuth0();
  const { addToast } = useToasts();
  const history = useHistory();
  const { data: filterVal } = useSWR(["api/public/filter/1", getToken], fetchWithToken);
  const upsertFilter = buildUpsertFilter(getToken,
    () => {
      history.push("/courses");
      addToast("New Course Saved", { appearance: 'success' });
    },
    () => {
      addToast("Error saving course", { appearance: 'error' });
    });

  const deleteFilter = buildDeleteFilter(getToken,
    () => {
      history.push("/courses");
      addToast("New Course Saved", { appearance: 'success' });
    },
    () => {
      addToast("Error saving course", { appearance: 'error' });
    });


  return (
    <>
      <QuarterFilterForm upsertFilter={upsertFilter} deleteFilter={deleteFilter} />
    </>
  );
};

export default QuarterFilter;
