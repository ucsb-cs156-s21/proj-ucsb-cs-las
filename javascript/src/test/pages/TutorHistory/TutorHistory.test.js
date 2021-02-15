import React, { useState } from "react";
import { render, waitFor } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import TutorHistory from "main/pages/TutorHistory/TutorHistory.js";
import userEvent from "@testing-library/user-event";
import useSWR from "swr";

import { fetchWithToken } from "main/utils/fetch";

import { useToasts } from 'react-toast-notifications'

import { buildSearchTutorHistoryByCourse } from "main/services/TutorHistory/TutorHistoryService";
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn()
}));
jest.mock("@auth0/auth0-react");
jest.mock("swr");
jest.mock("react-router-dom", () => ({
  useHistory: jest.fn() // and this one too
}));
jest.mock("main/utils/fetch", () => ({
  fetchWithToken: jest.fn()
}));
jest.mock('react-toast-notifications', () => ({
  useToasts: jest.fn()
}));
jest.mock("main/services/TutorHistory/TutorHistoryService", () => ({
  buildSearchTutorHistoryByCourse: jest.fn()
}));

describe("Tutor History page test", () => {
  const user = {
    name: "test user",
  };

  const sampleTutorAssignments = [
    {
      id: 1,
      course: { name: "CMPSC 156",
        id: 1,
        quarter: "20202",
        instructorFirstName: "Phill",
        instructorLastName: "Conrad",
        instructorEmail: "phtcon@ucsb.edu",
      },
      tutor: { email: "scottpchow@ucsb.edu",
        firstName: "Scott",
        id: 1,
        lastName: "Chow"},
      assignmentType: "TA",
    },
    {
      id: 2,
      course: { name: "CMPSC 148",
        id: 2,
        quarter: "20204",
        instructorFirstName: "Jack",
        instructorLastName: "Smith",
        instructorEmail: "js@ucsb.edu",
      },
      tutor: { email: "alu@ucsb.edu",
        firstName: "Andrew",
        id: 2,
        lastName: "LU"},
      assignmentType: "LA",
    },
  ];

  const sampleCourseNumberList = ["CMPSC 148"];

  const getAccessTokenSilentlySpy = jest.fn();
  const addToastSpy = jest.fn();
  const setStateSpy = jest.fn();
  beforeEach(() => {
    useState.mockImplementation(init => [init, setStateSpy]);
    useAuth0.mockReturnValue({
      admin: undefined,
      getAccessTokenSilently: getAccessTokenSilentlySpy,
      user: user
    });
    useSWR.mockReturnValue({
      data: sampleCourseNumberList,
      error: undefined,
    })
    useToasts.mockReturnValue({
      addToast: addToastSpy
    })
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    render(<TutorHistory />);
  });

  test("clicking a course button initiates a search and updates search results", async () => {
    buildSearchTutorHistoryByCourse.mockImplementation(
      (fakeGetToken, onSuccess, onError) => {
        const func = async (query) => {
          try {
            const data = sampleTutorAssignments;
            onSuccess(data);
          } catch (fakeErr) {
            onError(fakeErr);
          }
        }
        return func;
      }
    );

    const { getByText } = render(
      <TutorHistory />
    );

    const courseButton = getByText(sampleCourseNumberList[0]);
    expect(courseButton).toBeInTheDocument();
    userEvent.click(courseButton);

    await waitFor(() => expect(buildSearchTutorHistoryByCourse).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(addToastSpy).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(setStateSpy).toHaveBeenCalledTimes(1));

    expect(buildSearchTutorHistoryByCourse).toHaveBeenCalledWith(getAccessTokenSilentlySpy, expect.any(Function), expect.any(Function));
    expect(addToastSpy).toHaveBeenCalledWith("Search results updated", { appearance: "success" });
    expect(setStateSpy).toHaveBeenCalledWith({showResults: true, results: sampleTutorAssignments});
  });

  test("clicking a course button causes an error Toast to pop up on error", async () => {
    const sampleErrorMessage = "sample error";
    buildSearchTutorHistoryByCourse.mockImplementation(
      (fakeGetToken, fakeOnSuccess, fakeOnError) => {
        const fakeFunc = async (fakeQuery) => {
          try {
            throw new Error(sampleErrorMessage);
            fakeOnSuccess();
          } catch (fakeErr) {
            fakeOnError(fakeErr);
          }
        }
        return fakeFunc;
    });

    const { getByText } = render(
      <TutorHistory />
    );

    const courseButton = getByText(sampleCourseNumberList[0]);
    expect(courseButton).toBeInTheDocument();
    userEvent.click(courseButton);

    await waitFor(() => expect(addToastSpy).toHaveBeenCalledTimes(1));
    expect(addToastSpy).toHaveBeenCalledWith(`Error finding tutors for course: Error: ${sampleErrorMessage}`, { appearance: 'error' });

  });

});


