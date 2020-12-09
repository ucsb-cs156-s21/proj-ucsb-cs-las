import React from "react";
import useSWR, { cache } from "swr";
import CourseForm from "main/components/Courses/CourseForm";
import { fetchWithToken } from "main/utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "main/components/Loading/Loading";
import { useParams, useHistory } from "react-router-dom";
import { buildUpdateCourse } from "main/services/Courses/CourseService";
import { useToasts } from 'react-toast-notifications'


const EditCourse = () => {
  const { addToast } = useToasts();
  const history = useHistory();
  const { courseId } = useParams();
  const { getAccessTokenSilently: getToken } = useAuth0();
  const updateCourse = buildUpdateCourse(
    getToken, 
    () => { 
      history.push("/courses"); 
      addToast("Course updated", { appearance: 'success' });
    }, 
    () => { 
      addToast("Error saving course", { appearance: 'error' });
    }
  );

  cache.clear();
  const { data: course } = useSWR(
    [`/api/public/courses/${courseId}`, getToken],
    fetchWithToken
  );

  return (
    <>
      <h1>Edit Course</h1>
      {
        course ?
          <CourseForm updateCourse={updateCourse} existingCourse={course} /> :
          <Loading />
      }
    </>
  );
};

export default EditCourse;

