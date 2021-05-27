import React from "react";
import { waitFor, render } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import NewOfficeHour from "main/pages/OfficeHours/NewOfficeHours";
import userEvent from "@testing-library/user-event";
import { useHistory } from 'react-router-dom';
import { buildCreateOfficeHour } from "main/services/OfficeHours/OfficeHourService";
import { fetchWithToken } from "main/utils/fetch";
import { useToasts } from 'react-toast-notifications'

import { quarterProvider, courseProvider, tutorAssignmentProvider } from "main/services/selectorSupport"
jest.mock("swr");
jest.mock("@auth0/auth0-react");
jest.mock("main/services/OfficeHours/OfficeHourService");
jest.mock("main/services/selectorSupport");

jest.mock("react-router-dom", () => ({
  useHistory: jest.fn() // and this one too
}));

jest.mock("main/utils/fetch");
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

describe("NewOfficeHours page test", () => {
  const pushSpy = jest.fn();
  const user = {
    name: "test user",
  };

  const getAccessTokenSilentlySpy = jest.fn();
  const sampleOfficeHour =
  {
    id: "3",
    startTime: "2:00PM",
    endTime: "3:00PM",
    dayOfWeek: "test",
    zoomRoomLink: "https://ucsb.zoom.us.test",
    notes: "test",
    tutorAssignment: {
      id: 2
    },
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
    });
    useHistory.mockReturnValue({
      push: pushSpy
    });
    quarterProvider.mockResolvedValue(["20201"]);
    courseProvider.mockResolvedValue([{ id: 1, name: "CMPSC 156" }]);
    tutorAssignmentProvider.mockResolvedValue([{ id: 2, tutor: { firstName: "Chris", lastName: "McTutorface" } }]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", async () => {
    render(<NewOfficeHour />);
    await waitFor(() => expect(quarterProvider).toHaveBeenCalledTimes(1));
  });

  test("clicking submit button redirects to office hours page", async () => {

    buildCreateOfficeHour.mockImplementation((_getToken, onSuccess, _onError) => {
      return () => {
        onSuccess();
      }
    });

    const { getByPlaceholderText, getByLabelText, getByText } = render(
      <NewOfficeHour />
    );

    await selectTutor(getByPlaceholderText, getByText);

    const startTimeInput = getByLabelText("Start Time");
    userEvent.type(startTimeInput, sampleOfficeHour.startTime);

    const endTimeInput = getByLabelText("End Time");
    userEvent.type(endTimeInput, sampleOfficeHour.endTime);

    const zoomRoomLinkInput = getByLabelText("Zoom Room Link");
    userEvent.type(zoomRoomLinkInput, sampleOfficeHour.zoomRoomLink);

    const notesInput = getByLabelText("Notes");
    userEvent.type(notesInput, sampleOfficeHour.notes);

    const submitButton = getByText("Submit");
    expect(submitButton).toBeInTheDocument();
    userEvent.click(submitButton);

    await waitFor(() => expect(pushSpy).toHaveBeenCalledTimes(1));
    expect(pushSpy).toHaveBeenCalledWith("/officehours");

  });

  test("clicking submit button redirects to home page on error", async () => {

    fetchWithToken.mockImplementation(() => {
      throw new Error();
    });

    buildCreateOfficeHour.mockImplementation((_getToken, _onSuccess, onError) => {
      return () => {
        onError();
      }
    });

    const {getByPlaceholderText, getByLabelText, getByText } = render(
      <NewOfficeHour />
    );

    await selectTutor(getByPlaceholderText, getByText);

    const startTimeInput = getByLabelText("Start Time");
    userEvent.type(startTimeInput, sampleOfficeHour.startTime);

    const endTimeInput = getByLabelText("End Time");
    userEvent.type(endTimeInput, sampleOfficeHour.endTime);

    const zoomRoomLinkInput = getByLabelText("Zoom Room Link");
    userEvent.type(zoomRoomLinkInput, sampleOfficeHour.zoomRoomLink);

    const notesInput = getByLabelText("Notes");
    userEvent.type(notesInput, sampleOfficeHour.notes);

    const submitButton = getByText("Submit");
    expect(submitButton).toBeInTheDocument();
    userEvent.click(submitButton);

    await waitFor(() => expect(addToast).toHaveBeenCalledTimes(1));
    expect(addToast).toHaveBeenCalledWith("Error saving office hour", { appearance: 'error' });

  });

});
