import React from "react";
import CourseForm from "main/components/Courses/QuarterFilterForm";
import { useAuth0 } from "@auth0/auth0-react";
import { buildCreateCourse } from "main/services/Courses/CourseService";
import { useHistory } from "react-router-dom";
import { useToasts } from 'react-toast-notifications'
import QuarterFilterForm from "../../components/Courses/QuarterFilterForm";



const QuarterFilter = () => {
  const history = useHistory();
  
  const { addToast } = useToasts();

  const { getAccessTokenSilently: getToken } = useAuth0();

  return (
    <>
     
      <QuarterFilterForm />
    </>
  );
};

export default QuarterFilter;
