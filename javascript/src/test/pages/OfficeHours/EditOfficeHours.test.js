import React from "react";
import { render, waitFor } from "@testing-library/react";
import {useHistory, useParams } from 'react-router-dom';
import EditOfficeHours from "main/pages/OfficeHours/EditOfficeHours";
import userEvent from "@testing-library/user-event";
import useSWR from "swr";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchWithToken } from "main/utils/fetch";
import { useToasts } from 'react-toast-notifications'
import { quarterProvider, courseProvider, tutorAssignmentProvider } from "main/services/selectorSupport"
import { buildUpdateOfficeHour } from "../../../main/services/OfficeHours/OfficeHourService";
jest.mock("swr");
jest.mock("@auth0/auth0-react");
jest.mock("main/services/OfficeHours/OfficeHourService");
jest.mock("main/services/selectorSupport");
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
const selectTutor = async (getByPlaceholderText, getByText) => {
  await waitFor(() => expect(quarterProvider).toHaveBeenCalledTimes(1));
  userEvent.click(getByPlaceholderText("Select a tutor"));
  userEvent.click(getByText("Winter 2020"));
  await waitFor(() => expect(courseProvider).toHaveBeenCalledWith("20201"));
  userEvent.click(getByText("CMPSC 156"));
  await waitFor(() => expect(tutorAssignmentProvider).toHaveBeenCalledWith(1));
  userEvent.click(getByText("Chris McTutorface"));
}
describe("Edit OfficeHours page test", () => {
    const course =
    {
        name: "CMPSC 156",
        id: 1,
        quarter: "20202",
        instructorFirstName: "Phill",
        instructorLastName: "Conrad",
        instructorEmail: "phtcon@ucsb.edu",
    };
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
    const tutor =
    {
        firstName: "Bob",
        lastName: "Joe",
        email: "bobjoe@ucsb.edu",
        id: 3
    };
    const tutorAssignment =
    {
        id: 2,
        course: {
            name: "CMPSC 156",
            id: 1,
            quarter: "20202",
            instructorFirstName: "Phill",
            instructorLastName: "Conrad",
            instructorEmail: "phtcon@ucsb.edu",
        },
        tutor: {
            firstName: "Bob",
            lastName: "Joe",
            email: "bobjoe@ucsb.edu",
            id: 3
        },
        assignmentType: "TA"
    };
    const officeHour =
    {
        id: "4",
        startTime: "2:00PM",
        endTime: "3:00PM",
        dayOfWeek: "Monday",
        zoomRoomLink: "https://ucsb.zoom.us.test",
        notes: "test",
        tutorAssignment: {
            id: 2,
            course: {
                name: "CMPSC 156",
                id: 1,
                quarter: "20202",
                instructorFirstName: "Phill",
                instructorLastName: "Conrad",
                instructorEmail: "phtcon@ucsb.edu",
            },
            tutor: {
                firstName: "Bob",
                lastName: "Joe",
                email: "bobjoe@ucsb.edu",
                id: 3
            },
            assignmentType: "TA"
        }
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
      officeHourId: "4"
    });
    useToasts.mockReturnValue({
      addToast: addToast
    })
    quarterProvider.mockResolvedValue(["20201"]);
    courseProvider.mockResolvedValue([{ id: 1, name: "CMPSC 156" }]);
    tutorAssignmentProvider.mockResolvedValue([{ id: 2, tutor: { firstName: "Chris", lastName: "McTutorface" } }]);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("Renders office hour with existing office hour", async () => {
    fetchWithToken.mockImplementation(() => {
      throw new Error();
    });
    buildUpdateOfficeHour.mockImplementation((_getToken, _onSuccess, onError) => {
      return () => {
        onError();
      }
    });
    useSWR.mockReturnValueOnce({
      data: officeHour,
      error: undefined,
      mutate: mutateSpy,
    });
    useSWR.mockReturnValue({
      data: courses,
      error: undefined,
      mutate: mutateSpy,
    });
    const { getByPlaceholderText, getByText, getByLabelText } = render(
       <EditOfficeHours />
    );
    await selectTutor(getByPlaceholderText, getByText);
    await waitFor(() => (
      expect(getByText("Start Time")).toBeInTheDocument() &&
      expect(getByLabelText("Start Time").value).toEqual(officeHour.startTime)
    ));
    await waitFor(() => (
        expect(getByText("End Time")).toBeInTheDocument() &&
        expect(getByLabelText("End Time").value).toEqual(officeHour.endTime)
    ));
    await waitFor(() => (
        expect(getByText("Day of Week")).toBeInTheDocument() &&
        expect(getByLabelText("Day of Week").value).toEqual(officeHour.dayOfWeek)
    ));
    await waitFor(() => (
        expect(getByText("Zoom Room Link")).toBeInTheDocument() &&
        expect(getByLabelText("Zoom Room Link").value).toEqual(officeHour.zoomRoomLink)
    ));
    await waitFor(() => (
        expect(getByText("Notes")).toBeInTheDocument() &&
        expect(getByLabelText("Notes").value).toEqual(officeHour.notes)
    ));
  });
  test("Renders spinner with no existing office hour", () => {
    useSWR.mockReturnValue({
      data: undefined,
      error: undefined,
      mutate: mutateSpy,
    });
    const { getByTestId } = render(
      <EditOfficeHours />
    );
    const spinner = getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });
  test("With existing office hour, pressing submit routes back to OfficeHours page", async () => {
    buildUpdateOfficeHour.mockImplementation((_getToken, onSuccess, _onError) => {
      return () => {
        onSuccess();
      }
    });
    useSWR.mockReturnValueOnce({
      data: officeHour,
      error: undefined,
      mutate: mutateSpy,
    });
    useSWR.mockReturnValue({
      data: courses,
      error: undefined,
      mutate: mutateSpy,
    });
    const pushSpy = jest.fn();
    useHistory.mockReturnValue({
      push: pushSpy
    });
    const { getByText } = render(
      <EditOfficeHours />
   );
    const submitButton = getByText("Submit");
    expect(submitButton).toBeInTheDocument();
    userEvent.click(submitButton);
    await waitFor(() => expect(pushSpy).toHaveBeenCalledTimes(1));
    expect(pushSpy).toHaveBeenCalledWith("/officeHours");
  });
  test("clicking submit button redirects to home page on error", async () => {
    fetchWithToken.mockImplementation(() => {
      throw new Error();
    });
    buildUpdateOfficeHour.mockImplementation((_getToken, _onSuccess, onError) => {
      return () => {
        onError();
      }
    });
    useSWR.mockReturnValueOnce({
      data: officeHour,
      error: undefined,
      mutate: mutateSpy,
    });
    useSWR.mockReturnValue({
      data: courses,
      error: undefined,
      mutate: mutateSpy,
    });
    const pushSpy = jest.fn();
    useHistory.mockReturnValue({
      push: pushSpy
    });
    const { getByText } = render(
      <EditOfficeHours />
    );
    const submitButton = getByText("Submit");
    expect(submitButton).toBeInTheDocument();
    userEvent.click(submitButton);
    expect(addToast).toHaveBeenCalledTimes(1);
    expect(addToast).toHaveBeenCalledWith("Error updating office hour", { appearance: 'error' });
  });
});