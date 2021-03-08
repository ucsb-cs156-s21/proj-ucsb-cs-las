import React, { useState } from "react";
import { render } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import TutorAssignmentHistory from "main/pages/TutorAssignmentHistory/TutorAssignmentHistory.js";
import useSWR from "swr";

import { useToasts } from 'react-toast-notifications'

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



describe("Tutor Assignment History page test", () => {
  const user = {
    name: "test user",
  };


  const mutateSpy = jest.fn();
  const getAccessTokenSilentlySpy = jest.fn();
  const addToastSpy = jest.fn();
  const setStateSpy = jest.fn();


  test("renders loading while course list is undefined", () => {
    useSWR.mockReturnValue({
      data: undefined,
      error: undefined,
      mutate: mutateSpy,
    });
    const { getByAltText } = render(<TutorAssignmentHistory />);
    const loading = getByAltText("Loading");
    expect(loading).toBeInTheDocument();
  });

  const sampleCourseNumberList = ["CMPSC 148"];

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
    render(<TutorAssignmentHistory />);
  });




});


