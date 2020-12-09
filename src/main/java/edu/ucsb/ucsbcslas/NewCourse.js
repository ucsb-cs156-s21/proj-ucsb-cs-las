import React from "react";
import CourseForm from "main/components/Courses/CourseForm";
import { useAuth0 } from "@auth0/auth0-react";
import { buildCreateCourse } from "main/services/Courses/CourseService";
import { useHistory } from "react-router-dom";
import { useToasts } from 'react-toast-notifications'



const NewCourse = () => {
  const history = useHistory();
  
  const { addToast } = useToasts();

  const { getAccessTokenSilently: getToken } = useAuth0();

  const createCourse = buildCreateCourse(
    getToken,
    () => { 
      history.push("/courses"); 
      addToast("New Course Saved", { appearance: 'success' });
    }, 
    () => { 
      addToast("Error saving course", { appearance: 'error' });
    }
  );

  return (
    <>
      <h1>Add New Course</h1>
      <CourseForm createCourse={createCourse} />
    </>
  );
};

export default NewCourse;

