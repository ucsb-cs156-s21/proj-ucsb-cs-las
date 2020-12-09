import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Router, useHistory, useParams } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import EditTutorAssignment from "main/pages/TutorAssignment/EditTutorAssignment";
import userEvent from "@testing-library/user-event";

import useSWR from "swr";
jest.mock("swr");
import { useAuth0 } from "@auth0/auth0-react";
jest.mock("@auth0/auth0-react");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use real functions 
  useParams: jest.fn(), // except for just this one
  useHistory: jest.fn() // and this one too
}));

import { fetchWithToken } from "main/utils/fetch";
jest.mock("main/utils/fetch", () => ({
  fetchWithToken: jest.fn()
}));

import { useToasts } from 'react-toast-notifications'
jest.mock('react-toast-notifications', () => ({
  useToasts: jest.fn()
}));

describe("Edit Tutor Assignment page test", () => {
    const courses = [
        {
        name: "CMPSC 156",
        id: 1,
        quarter: "20202",
        instructorFirstName: "Phill",
        instructorLastName: "Conrad",
        instructorEmail: "phtcon@ucsb.edu",
        },
        {
        name: "CMPSC 148",
        id: 2,
        quarter: "20203",
        instructorFirstName: "Chandra",
        instructorLastName: "Krintz",
        instructorEmail: "krintz@example.org",
        },
    ];

  const sampleTutorAssignment = {
    id: 1,
    course:  {name: "CMPSC 148",
              id: 2,
              quarter: "20203",
              instructorFirstName: "Chandra",
              instructorLastName: "Krintz",
              instructorEmail: "krintz@example.org",
              },
      tutor:  {email: "scottpchow@ucsb.edu",
              firstName: "Scott",
              id: 1,
              lastName: "Chow"},
      assignmentType: "TA"
    };    

  const user = {
    name: "test user",
  };
  const getAccessTokenSilentlySpy = jest.fn();
  const mutateSpy = jest.fn();
  const addToast = jest.fn();

  beforeEach(() => {
    useAuth0.mockReturnValue({
      admin: undefined,
      getAccessTokenSilently: getAccessTokenSilentlySpy,
      user: user
    });
    useParams.mockReturnValue({
      tutorAssignmentId: 1
    });
    useToasts.mockReturnValue({
      addToast: addToast
    })
    useSWR.mockReturnValue({
        data: courses,
        error: undefined,
        mutate: mutateSpy,
      });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Renders tutor assignment with existing tutor assignment", async () => {
    // useSWR.mockReturnValueOnce({
    //     data: courses,
    //     error: undefined,
    //     mutate: mutateSpy,
    //   });
    useSWR.mockReturnValue({
        data: sampleTutorAssignment,
        error: undefined,
        mutate: mutateSpy,
      });
    const { getByText, getByLabelText } = render(
      <EditTutorAssignment />
    );

    await waitFor(() => (
      expect(getByText("Tutor Name")).toBeInTheDocument() &&
      expect(getByLabelText("Tutor Email").value).toEqual(sampleTutorAssignment.tutor.email)
    ));
    
  });

//   test("Renders spinner with no existing course", () => {
//     useSWR.mockReturnValue({
//       data: undefined,
//       error: undefined,
//       mutate: mutateSpy,
//     });
//     const { getByTestId } = render(
//       <EditCourse />
//     );
//     const spinner = getByTestId("spinner");
//     expect(spinner).toBeInTheDocument();
//   });

//   test("With existing course, pressing submit routes back to Courses page", async () => {
//     useSWR.mockReturnValue({
//       data: course,
//       error: undefined,
//       mutate: mutateSpy,
//     });

//     const pushSpy = jest.fn();
//     useHistory.mockReturnValue({
//       push: pushSpy
//     });

//     const { getByText } = render(
//       <EditCourse />
//     );

//     const submitButton = getByText("Submit");
//     expect(submitButton).toBeInTheDocument();
//     userEvent.click(submitButton);

//     await waitFor(() => expect(pushSpy).toHaveBeenCalledTimes(1));
//     expect(pushSpy).toHaveBeenCalledWith("/courses");

//   });

//   test("clicking submit button redirects to home page on error", async () => {

//     fetchWithToken.mockImplementation(() => {
//       throw new Error();
//     });

//     useSWR.mockReturnValue({
//       data: course,
//       error: undefined,
//       mutate: mutateSpy,
//     });

//     const pushSpy = jest.fn();
//     useHistory.mockReturnValue({
//       push: pushSpy
//     });

//     const { getByText } = render(
//       <EditCourse />
//     );

//     const submitButton = getByText("Submit");
//     expect(submitButton).toBeInTheDocument();
//     userEvent.click(submitButton);

//     expect(addToast).toHaveBeenCalledTimes(1);
//     expect(addToast).toHaveBeenCalledWith("Error saving course", { appearance: 'error' });

//   });


});


