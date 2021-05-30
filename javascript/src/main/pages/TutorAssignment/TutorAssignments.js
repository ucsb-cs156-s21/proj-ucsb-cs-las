import React from "react";
import useSWR from "swr";
import { Button } from "react-bootstrap";
import { fetchWithToken } from "main/utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "main/components/Loading/Loading";
import TutorAssignmentTable from "main/components/TutorAssignment/TutorAssignmentTable"

import {useHistory} from "react-router-dom";
import { CSVLink } from "react-csv";

const TutorAssignment = () => {
  const history = useHistory();
  const { user, getAccessTokenSilently: getToken } = useAuth0();
  const { email } = user;

  const { data: roleInfo } = useSWR(
      ["/api/myRole", getToken],
      fetchWithToken
  );

  const { data: instructorCourseList } = useSWR(
    [`/api/member/courses/forInstructor/${email}`, getToken],
    fetchWithToken
  );

  const isInstructor = roleInfo && roleInfo.role && instructorCourseList && (instructorCourseList.length > 0 || roleInfo.role.toLowerCase() === "admin");

  const { data: tutorAssignmentList, error } = useSWR(
    ["/api/member/tutorAssignments", getToken],
    fetchWithToken
  );

  const newTutorAssignmentButton = <Button className="mb-3" onClick={()=>history.push("/tutorAssignments/new")}>New Tutor Assignment</Button>;

  const headers = [{
    key: 'id',
    label: 'Course Id'
  }, {
    key: 'course.name',
    label: 'Course Name'
  }, {
    key: 'course.quarter',
    label: 'Course Quarter'
  }, {
    key: 'tutor.firstName',
    label: 'Tutor First Name'
  }, {
    key: 'tutor.lastName',
    label: 'Tutor Last Name'
  }, {
    key: 'tutor.email',
    label: 'Tutor Email'
  }, {
    key: 'assignmentType',
    label: 'Assignment Type'
  }];

  if (error) {
    return (
      <>
        {isInstructor && newTutorAssignmentButton}
        <h1>You have no current Tutor Assignments or we encountered an error; please reload the page and try again.</h1>
      </>
    );
  }
  if (!tutorAssignmentList) {
    return <Loading />;
  }

  return (
    <>
      {isInstructor && newTutorAssignmentButton}   
      <br></br>   
      <Button><CSVLink style={{color: "white"}} headers={headers} data={tutorAssignmentList} filename = {"TutorAssignments.csv"}>Download CSV</CSVLink></Button>
      <hr></hr>
      <TutorAssignmentTable tutorAssignments={tutorAssignmentList} isInstructor={isInstructor}/>
    </>
  );
};

export default TutorAssignment;