import React from "react";
import { waitFor, render } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import NewOfficeHour from "main/pages/OfficeHours/NewOfficeHours";
import userEvent from "@testing-library/user-event";
import { useHistory } from 'react-router-dom';
import { buildCreateOfficeHour } from "main/services/OfficeHours/OfficeHourService";
import { fetchWithToken } from "main/utils/fetch";
import { useToasts } from 'react-toast-notifications'
jest.mock("swr");
jest.mock("@auth0/auth0-react");
jest.mock("main/services/OfficeHours/OfficeHourService");

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
      id: "3"       
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
      addToast : addToast
    });
    useHistory.mockReturnValue({
      push: pushSpy
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    render(<NewOfficeHour />);
  });

  test("clicking submit button redirects to office hours page", async () => {

    buildCreateOfficeHour.mockImplementation((_getToken, onSuccess, _onError) => {
      return () => {
        onSuccess();
      }
    });

    const { getByLabelText, getByText } = render(
      <NewOfficeHour />
    );

    const idInput = getByLabelText("Tutor Assignment ID");
    userEvent.type(idInput, sampleOfficeHour.tutorAssignment.id);

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

    const { getByLabelText, getByText } = render(
      <NewOfficeHour />
    );

    const idInput = getByLabelText("Tutor Assignment ID");
    userEvent.type(idInput, sampleOfficeHour.tutorAssignment.id);

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
