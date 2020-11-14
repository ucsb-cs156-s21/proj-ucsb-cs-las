import React from "react";
import useSWR from "swr";
import { ListGroup } from "react-bootstrap";
import CourseForm from "../../components/Courses/CourseForm";
import { fetchWithToken } from "main/utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "main/components/Loading/Loading";
import { sortCourses } from "../../utils/courseHelpers";
import CourseTable from "../../components/Courses/CourseTable"
import { useParams, useHistory } from "react-router-dom";
import { buildUpdateCourse } from "main/services/Courses/CourseService";

const EditCourse = () => {
  const history = useHistory();
  const { courseId } = useParams();
  const { user, getAccessTokenSilently: getToken } = useAuth0();
  const updateCourse = buildUpdateCourse(getToken, () => { history.push("/courses") });

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

