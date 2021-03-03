import React from "react";
import OfficeHourForm from "main/components/OfficeHours/OfficeHourForm";
import { useAuth0 } from "@auth0/auth0-react";
import { buildCreateOfficeHour } from "main/services/OfficeHours/OfficeHourService";
import { useHistory } from "react-router-dom";
import { useToasts } from 'react-toast-notifications'

import useSWR from "swr";
import { fetchQuarters } from "main/services/Courses/QuartersService"
import { fetchCoursesForQuarter } from "main/services/Courses/CoursesForQuarterService";
import { fetchTutorAssignmentsForCourse } from "main/services/TutorAssignment/TutorAssignmentsForCourseService.js";

const NewOfficeHour = () => {
  const history = useHistory();
  const { addToast } = useToasts();
  const { getAccessTokenSilently: getToken } = useAuth0();

  const { data: quarters, error: _errorGettingQuarters } = useSWR(
    "/api/public/quarters",
    fetchQuarters,
    {
      initialData: [],
      revalidateOnMount: true
    }
  );

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

  const fetchers = {
    getCoursesForQuarter: fetchCoursesForQuarter,
    getTAsForCourse: fetchTutorAssignmentsForCourse
  }

  return (
    <>
      <h1>Add New Office Hour</h1>
      <OfficeHourForm createOfficeHour={createOfficeHour} quarters={quarters} fetchers={fetchers} />
    </>
  );
};

export default NewOfficeHour;