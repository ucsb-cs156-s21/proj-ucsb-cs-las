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

  const { data: tutorAssignmentList, error, mutate: mutateTutors } = useSWR(
    ["/api/member/tutorAssignments", getToken],
    fetchWithToken
  );

  const newTutorAssignmentButton = (
    <Button
      className="mb-3"
      onClick={() => history.push("/tutorAssignments/new")}
    >
      New Tutor Assignment
    </Button>
  );

  if (error) {
    return (
      <>
        {isInstructor && newTutorAssignmentButton}
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

  const uploadTutorAssignment = uploadTutorAssignmentCSV(
    getToken,
    () => {
      mutateTutors();
      addToast("CSV Uploaded", { appearance: "success" });
    },
    () => {
      addToast("Error Uploading CSV", { appearance: "error" });
    }
  );

  return (
    <>
      <>
        {isInstructor && newTutorAssignmentButton}
        <TutorAssignmentTable
          tutorAssignments={tutorAssignmentList}
          isInstructor={isInstructor}
        />
      </>
      <TutorAssignmentCSVButton admin={isInstructor}  addTask={uploadTutorAssignment} />
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
        Required Columns: Course, First and Last Name, Assignment Type.Ex: CMPSC 48 Fall 2020, Joe Gaucho, LA
      </pre>
    </>
  );
};

export default TutorAssignment;
