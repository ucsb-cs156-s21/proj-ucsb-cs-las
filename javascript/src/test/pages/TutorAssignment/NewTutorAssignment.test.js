import React from "react";
import { render, waitFor } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import NewTutorAssignment from "main/pages/TutorAssignment/NewTutorAssignment";
import userEvent from "@testing-library/user-event";
import useSWR from "swr";
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

describe("New Tutor Assignment page test", () => {
  const user = {
    name: "test user",
  };
  const getAccessTokenSilentlySpy = jest.fn();
  const course = {
    name: "CMPSC 156",
    id: 1,
    quarter: "20203",
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
    useSWR.mockReturnValue({data: [course]});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    render(<NewTutorAssignment />);
  });

  test("clicking submit button redirects to tutor assignment page", async () => {
    const pushSpy = jest.fn();
    useHistory.mockReturnValue({
      push: pushSpy
    });

    const { getByText, _getByLabelText } = render(
      <NewTutorAssignment />
    );

    const submitButton = getByText("Submit");
    expect(submitButton).toBeInTheDocument();
    userEvent.click(submitButton);

    await waitFor(() => expect(pushSpy).toHaveBeenCalledTimes(1));
    expect(pushSpy).toHaveBeenCalledWith("/tutorAssignments");
    
  });

  test("clicking submit button stays on same page on error", async () => {

    fetchWithToken.mockImplementation(() => {
      throw new Error();
    });

    const pushSpy = jest.fn();
    useHistory.mockReturnValue({
      push: pushSpy
    });

    const { getByText } = render(
      <NewTutorAssignment />
    );

    const submitButton = getByText("Submit");
    expect(submitButton).toBeInTheDocument();
    userEvent.click(submitButton);

    expect(addToast).toHaveBeenCalledTimes(1);
    expect(addToast).toHaveBeenCalledWith("Error saving Tutor Assignment. Make sure tutor email is correct", { appearance: 'error' });
  });

});