import React from "react";
import useSWR from "swr";
import { Button } from "react-bootstrap";
import { fetchWithToken } from "main/utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "main/components/Loading/Loading";
import TutorAssignmentTable from "main/components/TutorAssignment/TutorAssignmentTable";
import { TutorAssignmentCSVButton } from "main/components/TutorAssignment/TutorAssignmentCSVButton";
import { useToasts } from "react-toast-notifications";

import { uploadTutorAssignmentCSV } from "main/services/TutorAssignment/TutorAssignmentService";

import { useHistory } from "react-router-dom";
import { CSVLink } from "react-csv";

const TutorAssignment = () => {
  const history = useHistory();
  const { user, getAccessTokenSilently: getToken } = useAuth0();
  const { email } = user;
  const { addToast } = useToasts();

  const { data: roleInfo } = useSWR(["/api/myRole", getToken], fetchWithToken);

  const { data: instructorCourseList } = useSWR(
    [`/api/member/courses/forInstructor/${email}`, getToken],
    fetchWithToken
  );

  const isInstructor =
    roleInfo &&
    roleInfo.role &&
    instructorCourseList &&
    (instructorCourseList.length > 0 ||
      roleInfo.role.toLowerCase() === "admin");

  const {
    data: tutorAssignmentList,
    error,
    mutate: mutateTutorAssignments,
  } = useSWR(["/api/member/tutorAssignments", getToken], fetchWithToken);

  const newTutorAssignmentButton = (
    <Button
      className="mb-3"
      onClick={() => history.push("/tutorAssignments/new")}
    >
      New Tutor Assignment
    </Button>
  );

  const uploadTutorAssignment = uploadTutorAssignmentCSV(
    getToken,
    () => {
      mutateTutorAssignments();
      addToast("CSV Uploaded", { appearance: "success" });
    },
    () => {
      addToast("Error Uploading CSV", { appearance: "error" });
    }
  );

  const tutorAssignmentUploadCSVButton = (
    <>

      <TutorAssignmentCSVButton
        admin={isInstructor}
        addTask={uploadTutorAssignment}
      />
      <pre
        style={{
          whiteSpace: "pre",
          textAlign: "left",
          width: "auto",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "0em",
        }}
        muted
      >
        Required Columns: Course Name, Quarter, Instructor First Name,
        Instructor Last Name, Instructor Email, Tutor First Name, Tutor Name,
        Tutor Email, Assignment Type.Ex: CMPSC 48, 20201, Joe, Gaucho, joegaucho
        @ucsb.edu, Joe, Gaucho, joegaucho @ucsb.edu, LA
      </pre>
      <br></br>
    </>
  );

  const headers = [
    {
      key: "id",
      label: "Course Id",
    },
    {
      key: "course.name",
      label: "Course Name",
    },
    {
      key: "course.quarter",
      label: "Course Quarter",
    },
    {
      key: "tutor.firstName",
      label: "Tutor First Name",
    },
    {
      key: "tutor.lastName",
      label: "Tutor Last Name",
    },
    {
      key: "tutor.email",
      label: "Tutor Email",
    },
    {
      key: "assignmentType",
      label: "Assignment Type",
    },
  ];

  if (error) {
    return (
      <>
        {isInstructor &&
          newTutorAssignmentButton
          }

          <>
          {tutorAssignmentUploadCSVButton}
          </>
        <h1>
          You have no current Tutor Assignments or we encountered an error;
          please reload the page and try again.
        </h1>
      </>
    );
  }

  if (!tutorAssignmentList) {
    return <Loading />;
  }

  return (
    <>
      {newTutorAssignmentButton}
      {tutorAssignmentUploadCSVButton}

      <TutorAssignmentTable
        tutorAssignments={tutorAssignmentList}
        isInstructor={isInstructor}
      />
      <Button>
        <CSVLink
          style={{ color: "white" }}
          headers={headers}
          data={tutorAssignmentList}
          filename={"TutorAssignments.csv"}
        >
          Download CSV
        </CSVLink>
      </Button>
    </>
  );
};

export default TutorAssignment;
