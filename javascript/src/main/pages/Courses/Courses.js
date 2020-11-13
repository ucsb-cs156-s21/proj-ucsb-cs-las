import React from "react";
import useSWR from "swr";
import { ListGroup } from "react-bootstrap";
// import { CourseForm } from "./CourseForm";
import CourseForm from "../../components/Courses/CourseForm";
import { CourseItem } from "./CourseItem";
import { CourseHeader } from "./CourseHeader";
import { fetchWithToken } from "main/utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "main/components/Loading/Loading";
import { sortCourses } from "../../utils/courseHelpers";
import CourseTable from "../../components/Courses/CourseTable"
import { buildCreateCourse, buildDeleteCourse, buildUpdateCourse } from "main/services/Courses/CourseService";


const CourseList = () => {
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
  const updateCourse = buildUpdateCourse(getToken, mutateCourses);
  const deleteCourse = buildDeleteCourse(getToken, mutateCourses);
  const createCourse = buildCreateCourse(getToken, mutateCourses);
  const items = sortCourses(courseList).map((item, index) => {
    console.log(item);
    return (
      <CourseItem
        key={item.id}
        item={item}
        index={index}
        updateCourse={updateCourse}
        deleteCourse={deleteCourse}
      />
    );
  });

  return (
    <>
      <CourseHeader name={user.name} />
      <CourseForm createCourse={createCourse} />
      <ListGroup> {items} </ListGroup>
      <CourseTable courses={courseList || []} />
    </>
  );
};

export default CourseList;

