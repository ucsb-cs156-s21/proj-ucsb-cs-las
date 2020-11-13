import React from "react";
import useSWR from "swr";
import { ListGroup } from "react-bootstrap";
import CourseForm from "../../components/Courses/CourseForm";
import { CourseItem } from "./CourseItem";
import { CourseHeader } from "./CourseHeader";
import { fetchWithToken } from "main/utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "main/components/Loading/Loading";
import { sortCourses } from "../../utils/courseHelpers";
import CourseTable from "../../components/Courses/CourseTable"

const NewCourse = () => {
  const { user, getAccessTokenSilently: getToken } = useAuth0();
  const { data: courseList, error, mutate: mutateCourses } = useSWR(
    ["/api/public/courses", getToken],
    fetchWithToken
  );
  if (error) {
    return (
      <h1>We encountered an error; please reload the page and try again.</h1>
    );
  }
  if (!courseList) {
    return <Loading />;
  }
  const updateCourse = async (item, id) => {
    await fetchWithToken(`/api/admin/courses/${id}`, getToken, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(item),
    });
    await mutateCourses();
  };

  // const saveCourse = async (courseText1, courseText2, courseText3, courseText4, courseText5) => {
  //   await fetchWithToken(`/api/admin/courses/`, getToken, {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name: courseText1,
  //       quarter: courseText2,
  //       instructorFirstName: courseText3,
  //       instructorLastName: courseText4,
  //       instructorEmail: courseText5,
  //     }),
  //   });
  //   await mutateCourses();
  // };
  return (
    <>
      <h1>Show Course</h1>
      <CourseForm />
    </>
  );
};

export default NewCourse;

