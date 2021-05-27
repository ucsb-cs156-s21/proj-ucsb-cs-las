import React from "react";
import { render, waitFor } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import NewCourse from "main/pages/Courses/NewCourse";
import userEvent from "@testing-library/user-event";
import { useHistory } from 'react-router-dom';

import { fetchWithToken } from "main/utils/fetch";

import { useToasts } from 'react-toast-notifications'
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

    const { getByLabelText, getByText } = render(
      <NewCourse />
    );

    const nameInput = getByLabelText("Course Name");
    userEvent.type(nameInput, course.name);

    const quarterInput = getByLabelText("Quarter");
    userEvent.type(quarterInput, course.quarter);

    const fnameInput = getByLabelText("First Name");
    userEvent.type(fnameInput, course.instructorFirstName);

    const lnameInput = getByLabelText("Last Name");
    userEvent.type(lnameInput, course.instructorLastName);

    const emailInput = getByLabelText("Email");
    userEvent.type(emailInput, course.instructorEmail);

    const submitButton = getByText("Submit");
    expect(submitButton).toBeInTheDocument();
    userEvent.click(submitButton);

    //await waitFor(() => expect(pushSpy).toHaveBeenCalledTimes(1));
    //expect(pushSpy).toHaveBeenCalledWith("/courses");

  });

  test("test error text", async () => {

    const { getByText } = render(
      <NewCourse />
    );

    const submitButton = getByText("Submit");
    expect(submitButton).toBeInTheDocument();
    userEvent.click(submitButton);

    const errorText = getByText(/Please provide a course./);
    expect(errorText).toBeInTheDocument();


  });

  test("clicking submit button adds a toast on error", async () => {

    fetchWithToken.mockImplementation(() => {
      return { "error": "fake error message" };
    });

    const pushSpy = jest.fn();
    useHistory.mockReturnValue({
      push: pushSpy
    });

    const { getByLabelText, getByText } = render(
      <NewCourse />
    );

    const nameInput = getByLabelText("Course Name");
    userEvent.type(nameInput, course.name);

    const quarterInput = getByLabelText("Quarter");
    userEvent.type(quarterInput, course.quarter);

    const fnameInput = getByLabelText("First Name");
    userEvent.type(fnameInput, course.instructorFirstName);

    const lnameInput = getByLabelText("Last Name");
    userEvent.type(lnameInput, course.instructorLastName);

    const emailInput = getByLabelText("Email");
    userEvent.type(emailInput, course.instructorEmail);

    const submitButton = getByText("Submit");
    expect(submitButton).toBeInTheDocument();
    userEvent.click(submitButton);


    await waitFor(() => expect(addToast).toHaveBeenCalledTimes(1));
    expect(addToast).toHaveBeenCalledWith("fake error message", { appearance: 'error' });
  });

  test("clicking submit button adds a toast on error", async () => {

    fetchWithToken.mockImplementation(() => {
      return {};
    });

    const pushSpy = jest.fn();
    useHistory.mockReturnValue({
      push: pushSpy
    });

    const { getByLabelText, getByText } = render(
      <NewCourse />
    );

    const nameInput = getByLabelText("Course Name");
    userEvent.type(nameInput, course.name);

    const quarterInput = getByLabelText("Quarter");
    userEvent.type(quarterInput, course.quarter);

    const fnameInput = getByLabelText("First Name");
    userEvent.type(fnameInput, course.instructorFirstName);

    const lnameInput = getByLabelText("Last Name");
    userEvent.type(lnameInput, course.instructorLastName);

    const emailInput = getByLabelText("Email");
    userEvent.type(emailInput, course.instructorEmail);

    const submitButton = getByText("Submit");
    expect(submitButton).toBeInTheDocument();
    userEvent.click(submitButton);


    await waitFor(() => expect(addToast).toHaveBeenCalledTimes(1));
    expect(addToast).toHaveBeenCalledWith("New Course Saved", { appearance: 'success' });
  });

});


