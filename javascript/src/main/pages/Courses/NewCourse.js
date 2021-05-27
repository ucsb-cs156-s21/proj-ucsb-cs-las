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

  //TODO COVER THE TWO FUNCTIONS
  const createCourse = buildCreateCourse(
    getToken,
    (response) => {
      if (response.error) {
        console.log("error message: ", response.error);
        addToast(response.error, { appearance: 'error' });
      }
      else {
        history.push("/courses");
        addToast("New Course Saved", { appearance: 'success' });
      }
    },
    (err) => {
      console.log("error message: ", err);
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

