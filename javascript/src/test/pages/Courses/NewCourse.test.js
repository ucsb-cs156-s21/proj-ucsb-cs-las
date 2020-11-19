import React from "react";
import { render, waitFor } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
jest.mock("@auth0/auth0-react");
import NewCourse from "main/pages/Courses/NewCourse";
import userEvent from "@testing-library/user-event";
import useSWR from "swr";
jest.mock("swr");
import { useHistory } from 'react-router-dom';
jest.mock("react-router-dom", () => ({
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

describe("New Course page test", () => {
  const user = {
    name: "test user",
  };
  const getAccessTokenSilentlySpy = jest.fn();
  const course =
  {
    name: "CMPSC 156",
    id: 1,
    quarter: "F20",
    instructorFirstName: "Phill",
    instructorLastName: "Conrad",
    instructorEmail: "phtcon@ucsb.edu",
  };

  const addToast = jest.fn();
  beforeEach(() => {
    useAuth0.mockReturnValue({
      admin: undefined,
      getAccessTokenSilently: getAccessTokenSilentlySpy,
      user: user
    });
    useToasts.mockReturnValue({
      addToast: addToast
    })
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    render(<NewCourse />);
  });

  test("clicking submit button redirects to courses page", async () => {
    const pushSpy = jest.fn();
    useHistory.mockReturnValue({
      push: pushSpy
    });

    const { getByText } = render(
      <NewCourse />
    );

    const submitButton = getByText("Submit");
    expect(submitButton).toBeInTheDocument();
    userEvent.click(submitButton);

    await waitFor(() => expect(pushSpy).toHaveBeenCalledTimes(1));
    expect(pushSpy).toHaveBeenCalledWith("/courses");
    
  });

  test("clicking submit button redirects to home page on error", async () => {

    fetchWithToken.mockImplementation(() => {
      throw new Error();
    });

    const pushSpy = jest.fn();
    useHistory.mockReturnValue({
      push: pushSpy
    });

    const { getByText } = render(
      <NewCourse />
    );

    const submitButton = getByText("Submit");
    expect(submitButton).toBeInTheDocument();
    userEvent.click(submitButton);

    expect(addToast).toHaveBeenCalledTimes(1);
    expect(addToast).toHaveBeenCalledWith("Error saving course", { appearance: 'error' });

  });

});


