import React from "react";
import { waitFor, render } from "@testing-library/react";
import useSWR from "swr";
import { useAuth0 } from "@auth0/auth0-react";
import TutorNotes from "main/pages/TutorNotes/TutorNotes";
import { useToasts } from "react-toast-notifications";
import { buildDeleteTutorNotes } from "main/services/TutorNotes/TutorNotesService";
import userEvent from "@testing-library/user-event";
import { useHistory } from "react-router-dom";

jest.mock("swr");
jest.mock("@auth0/auth0-react");

jest.mock("main/services/TutorNotes/TutorNotesService", () => ({
  buildCreateTutorNotes: jest.fn(),
  buildDeleteTutorNotes: jest.fn()
}) );
jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(),
}));
jest.mock("react-toast-notifications", () => ({
  useToasts: jest.fn()
}));

describe("TutorNotes page test", () => {
  const sampleTutorNotes = {
    "id": 123,
    "onlineOfficeHours": {
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
    },
    "message": "Hello World"
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
    useSWR.mockReturnValueOnce({
      data: {role: "admin"},
      error: undefined,
      mutate: mutateSpy,
    });
    useToasts.mockReturnValue({
      addToast: addToast
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    useSWR.mockReturnValue({
        data: [sampleTutorNotes],
        error: undefined,
        mutate: mutateSpy,
    });
    render(<TutorNotes />);
  });
  console.log("tutorNotes Data in test", sampleTutorNotes);
  test("renders loading while tutor Notes list is undefined", () => {
    useSWR.mockReturnValue({
      data: undefined,
      error: undefined,
      mutate: mutateSpy,
    });
    const { getByAltText } = render(<TutorNotes />);
    const loading = getByAltText("Loading");
    expect(loading).toBeInTheDocument();
  });

  test("renders an error message when there is an error", async () => {
    useSWR.mockReturnValueOnce({
      data: {role: "admin"},
      error: undefined,
      mutate: mutateSpy,
    });
    useSWR.mockReturnValue({
      data: undefined,
      error: new Error("this is an error"),
      mutate: mutateSpy,
    });
    const fakeDeleteFunction = jest.fn();
    buildDeleteTutorNotes.mockReturnValue(fakeDeleteFunction);
    const pushSpy = jest.fn();
    useHistory.mockReturnValue({
      push: pushSpy
    });

    const { getByText } = render(<TutorNotes />);
    const error = getByText(/error/);
    expect(error).toBeInTheDocument();

    const newTutorNotesButton = getByText("New Tutor Notes");
    userEvent.click(newTutorNotesButton);

    await waitFor(() => expect(pushSpy).toHaveBeenCalledTimes(1));
  });

  test("can delete a tutorNote", async () => {
    useSWR.mockReturnValueOnce({
      data: { role: "admin" },
      error: undefined,
      mutate: mutateSpy
    });
    useSWR.mockReturnValue({
      data: [sampleTutorNotes],
      error: undefined,
      mutate: mutateSpy
    });
    const fakeDeleteFunction = jest.fn();
    buildDeleteTutorNotes.mockReturnValue(fakeDeleteFunction);
    const { getAllByTestId } = render(<TutorNotes />);
    const deleteButtons = getAllByTestId("delete-button-123");
    userEvent.click(deleteButtons[0]);
    await waitFor(() => expect(fakeDeleteFunction).toHaveBeenCalledTimes(1));
  });

});