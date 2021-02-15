import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Router, useHistory, useParams } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import EditTutor from "main/pages/Tutor/EditTutor";
import userEvent from "@testing-library/user-event";

import useSWR from "swr";
import { useAuth0 } from "@auth0/auth0-react";

import { fetchWithToken } from "main/utils/fetch";

import { useToasts } from 'react-toast-notifications'
jest.mock("swr");
jest.mock("@auth0/auth0-react");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use real functions 
  useParams: jest.fn(), // except for just this one
  useHistory: jest.fn() // and this one too
}));
jest.mock("main/utils/fetch", () => ({
  fetchWithToken: jest.fn()
}));
jest.mock('react-toast-notifications', () => ({
  useToasts: jest.fn()
}));

describe("Edit Tutor page test", () => {
  const tutor =
  {
    id: 1,
    firstName: "Phill",
    lastName: "Conrad",
    email: "phtcon@ucsb.edu",
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
      id: '1'
    });
    useToasts.mockReturnValue({
      addToast: addToast
    })
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Renders tutor with existing tutor", async () => {
    useSWR.mockReturnValue({
      data: tutor,
      error: undefined,
      mutate: mutateSpy,
    });
    const { getByText, getByLabelText } = render(
      <EditTutor />
    );

    await waitFor(() => (
      expect(getByText("First Name")).toBeInTheDocument() &&
      expect(getByLabelText("First Name").value).toEqual(tutor.firstName)
    ));
    
  });

  test("Renders spinner with no existing tutor", () => {
    useSWR.mockReturnValue({
      data: undefined,
      error: undefined,
      mutate: mutateSpy,
    });
    const { getByTestId } = render(
      <EditTutor />
    );
    const spinner = getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });

  test("With existing tutor, pressing submit routes back to Tutors page", async () => {
    useSWR.mockReturnValue({
      data: tutor,
      error: undefined,
      mutate: mutateSpy,
    });

    const pushSpy = jest.fn();
    useHistory.mockReturnValue({
      push: pushSpy
    });

    const { getByText } = render(
      <EditTutor />
    );

    const submitButton = getByText("Submit");
    expect(submitButton).toBeInTheDocument();
    userEvent.click(submitButton);

    await waitFor(() => expect(pushSpy).toHaveBeenCalledTimes(1));
    expect(pushSpy).toHaveBeenCalledWith("/tutors");

  });

  test("clicking submit button redirects to home page on error", async () => {

    fetchWithToken.mockImplementation(() => {
      throw new Error();
    });

    useSWR.mockReturnValue({
      data: tutor,
      error: undefined,
      mutate: mutateSpy,
    });

    const pushSpy = jest.fn();
    useHistory.mockReturnValue({
      push: pushSpy
    });

    const { getByText } = render(
      <EditTutor />
    );

    const submitButton = getByText("Submit");
    expect(submitButton).toBeInTheDocument();
    userEvent.click(submitButton);

    expect(addToast).toHaveBeenCalledTimes(1);
    expect(addToast).toHaveBeenCalledWith("Error saving tutor", { appearance: 'error' });

  });


});