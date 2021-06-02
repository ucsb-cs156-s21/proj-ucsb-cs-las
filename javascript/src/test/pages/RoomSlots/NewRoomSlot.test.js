import NewRoomSlot from "main/pages/RoomSlots/NewRoomSlot";
import React from "react";
import { render, waitFor } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import userEvent from "@testing-library/user-event";
import { useHistory } from 'react-router-dom';
import { buildCreateRoomSlot } from "main/services/RoomSlots/RoomSlotService";

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
jest.mock("main/services/RoomSlots/RoomSlotService");

describe("New Room Slot page test", () => {
  const pushSpy = jest.fn();

  const user = {
    name: "test user"
  };

  const getAccessTokenSilentlySpy = jest.fn();

  const testRoomSlot = {
    location: "Phelps 1024",
    quarter: "F20",
    dayOfWeek: "Monday",
    startTime: "12:00PM",
    endTime: "12:50PM"
  }

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
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    render(<NewRoomSlot />);
  });

  test("clicking submit button redirects to Room Slots page", async () => {
    buildCreateRoomSlot.mockImplementation((_getToken, onSuccess, _onError) => {
      return () => {
        onSuccess({
          error: null
        });
      }
    });

    const { getByLabelText, getByText } = render(
      <NewRoomSlot />
    );

    const locationInput = getByLabelText("Location");
    const quarterInput = getByLabelText("Quarter");
    const startTimeInput = getByLabelText("Start Time");
    const endTimeInput = getByLabelText("End Time");
    const dayOfWeekInput = getByLabelText("Day of Week");

    userEvent.type(locationInput, testRoomSlot.location);
    userEvent.type(quarterInput, "S21");
    userEvent.type(startTimeInput, testRoomSlot.startTime);
    userEvent.type(endTimeInput, testRoomSlot.endTime);
    userEvent.type(dayOfWeekInput, testRoomSlot.dayOfWeek);

    const submitButton = getByText("Submit");
    expect(submitButton).toBeInTheDocument();
    userEvent.click(submitButton);

    await waitFor(() => expect(pushSpy).toHaveBeenCalledTimes(1));
    expect(pushSpy).toHaveBeenCalledWith("/roomslots");
  });

  test("clicking submit button adds toast on error response", async () => {
    buildCreateRoomSlot.mockImplementation((_getToken, onSuccess, _onError) => {
      return () => {
        onSuccess({
          error: "fake error message from backend"
        });
      }
    });
    
    const { getByLabelText, getByText } = render(
      <NewRoomSlot />
    );

    const locationInput = getByLabelText("Location");
    const quarterInput = getByLabelText("Quarter");
    const startTimeInput = getByLabelText("Start Time");
    const endTimeInput = getByLabelText("End Time");
    const dayOfWeekInput = getByLabelText("Day of Week");

    userEvent.type(locationInput, testRoomSlot.location);
    userEvent.type(quarterInput, "S21");
    userEvent.type(startTimeInput, testRoomSlot.startTime);
    userEvent.type(endTimeInput, testRoomSlot.endTime);
    userEvent.type(dayOfWeekInput, testRoomSlot.dayOfWeek);

    const submitButton = getByText("Submit");
    expect(submitButton).toBeInTheDocument();
    userEvent.click(submitButton);

    await waitFor(() => expect(addToast).toHaveBeenCalledTimes(1));
    expect(addToast).toHaveBeenCalledWith("fake error message from backend", {appearance: "error"});
  });

  test("clicking submit button adds toast on error", async () => {
    buildCreateRoomSlot.mockImplementation((_getToken, _onSuccess, onError) => {
      return () => {
        onError("fake error message");
      }
    });
    
    const { getByLabelText, getByText } = render(
      <NewRoomSlot />
    );

    const locationInput = getByLabelText("Location");
    const quarterInput = getByLabelText("Quarter");
    const startTimeInput = getByLabelText("Start Time");
    const endTimeInput = getByLabelText("End Time");
    const dayOfWeekInput = getByLabelText("Day of Week");

    userEvent.type(locationInput, testRoomSlot.location);
    userEvent.type(quarterInput, "S21");
    userEvent.type(startTimeInput, testRoomSlot.startTime);
    userEvent.type(endTimeInput, testRoomSlot.endTime);
    userEvent.type(dayOfWeekInput, testRoomSlot.dayOfWeek);

    const submitButton = getByText("Submit");
    expect(submitButton).toBeInTheDocument();
    userEvent.click(submitButton);

    await waitFor(() => expect(addToast).toHaveBeenCalledTimes(1));
    expect(addToast).toHaveBeenCalledWith("Error saving room slot", {appearance: "error"});
  });

});