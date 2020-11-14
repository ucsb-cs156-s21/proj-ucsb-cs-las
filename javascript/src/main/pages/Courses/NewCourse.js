import React from "react";
import useSWR from "swr";
import { ListGroup } from "react-bootstrap";
import CourseForm from "../../components/Courses/CourseForm";
import { fetchWithToken } from "main/utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "main/components/Loading/Loading";
import { sortCourses } from "../../utils/courseHelpers";
import CourseTable from "../../components/Courses/CourseTable"
import {buildCreateCourse} from "main/services/Courses/CourseService";
import {useHistory} from "react-router-dom";


const NewCourse = () => {
  const history = useHistory();

  const { user, getAccessTokenSilently: getToken } = useAuth0();
  
  const createCourse = buildCreateCourse(getToken, ()=>history.push("/courses"))

  return (
    <>
      <h1>Add New Course</h1>
      <CourseForm createCourse={createCourse} />
    </>
  );
};

export default NewCourse;

