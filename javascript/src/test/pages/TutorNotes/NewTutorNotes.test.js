import React from "react";
import { render, waitFor } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import NewTutorNotes from "main/pages/TutorNotes/NewTutorNotes";
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

describe("New Tutor Notes page test", () => {
  const user = {
    name: "test user",
  };
  const getAccessTokenSilentlySpy = jest.fn();
  const sampleOfficeHour = {
    "id": 122,
    "tutorAssignment": {
      "id": 121,
      "course": {
        "id": 109,
        "name": "CMPSC 156",
        "quarter": "20212",
        "instructorFirstName": "Phill",
        "instructorLastName": "Conrad",
        "instructorEmail": "phtcon@ucsb.edu"
      },
      "tutor": {
        "id": 120,
        "firstName": "Phill",
        "lastName": "Conrad",
        "email": "phtcon@ucsb.edu"
      },
      "assignmentType": "TA"
    },
    "dayOfWeek": "Saturday",
    "startTime": "3:00PM",
    "endTime": "4:00PM",
    "zoomRoomLink": "",
    "notes": ""
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
    useSWR.mockReturnValue({data: [sampleOfficeHour]});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    render(<NewTutorNotes />);
  });

  test("clicking submit button redirects to tutor Notes page", async () => {
    const pushSpy = jest.fn();
    useHistory.mockReturnValue({
      push: pushSpy
    });

    const { getByText, _getByLabelText } = render(
      <NewTutorNotes />
    );

    const submitButton = getByText("Submit");
    expect(submitButton).toBeInTheDocument();
    userEvent.click(submitButton);

    await waitFor(() => expect(pushSpy).toHaveBeenCalledTimes(1));
    expect(pushSpy).toHaveBeenCalledWith("/tutorNotes");
    
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
      <NewTutorNotes />
    );

    const submitButton = getByText("Submit");
    expect(submitButton).toBeInTheDocument();
    userEvent.click(submitButton);

    expect(addToast).toHaveBeenCalledTimes(1);
    expect(addToast).toHaveBeenCalledWith("Error saving Tutor Notes", { appearance: 'error' });
  });

});