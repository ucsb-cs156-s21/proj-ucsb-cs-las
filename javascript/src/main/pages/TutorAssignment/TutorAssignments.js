import React from "react";
import useSWR from "swr";
import { Button } from "react-bootstrap";
import { fetchWithToken } from "main/utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "main/components/Loading/Loading";
import TutorAssignmentTable from "main/components/TutorAssignment/TutorAssignmentTable";
import { TutorAssignmentCSVButton } from "main/components/TutorAssignment/TutorAssignmentCSVButton";
import { useToasts } from "react-toast-notifications";

import { useHistory } from "react-router-dom";

const TutorAssignment = () => {
  const history = useHistory();
  const { user, getAccessTokenSilently: getToken } = useAuth0();
  const { email } = user;

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

  const { data: tutorAssignmentList, error } = useSWR(
    ["/api/member/tutorAssignments", getToken],
    fetchWithToken
  );

  if (error) {
    return (
      <>
        {isInstructor (
          <Button
            style={{ marginBottom: "1em" }}
            onClick={() => history.push("/tutorAssignments/new")}
          >
            New Tutor Assignment
          </Button>
        )}
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

  // const uploadTutorAssignment = uploadTutorAssigCSV(
  //   getToken,
  //   () => {
  //     mutateTutors();
  //     addToast("CSV Uploaded", { appearance: "success" });
  //   },
  //   () => {
  //     addToast("Error Uploading CSV", { appearance: "error" });
  //   }
  // );

  return (
    <>
      {isInstructor && (
        
        <><Button
          style={{ marginBottom: "1em" }}
          onClick={() => history.push("/tutorAssignments/new")}
        >
          New Tutor Assignment
        </Button>
          { <TutorAssignmentCSVButton admin={isInstructor} /*addTask={uploadTutorAssignment}*/ /> }
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
            Required Columns: Course, Tutor, Assignment type. Ex: CMPSC 48 Fall 2020, Joe Gaucho,
            LA
          </pre>
          </>
      )}
      <TutorAssignmentTable
        tutorAssignments={tutorAssignmentList}
        isInstructor={isInstructor}
      />
    </>
  );
};

export default TutorAssignment;
