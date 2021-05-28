import React from "react";
import { waitFor, render } from "@testing-library/react";
import useSWR from "swr";
import { useAuth0 } from "@auth0/auth0-react";
import RoomSlots from "main/pages/RoomSlots/RoomSlots";
import userEvent from "@testing-library/user-event";
//import { buildDeleteRoomSlot } from "main/services/RoomSlots/RoomSlotsService";

jest.mock("swr");
jest.mock("@auth0/auth0-react");
jest.mock("main/utils/fetch");

jest.mock("main/services/RoomSlots/RoomSlotsService", () => ({
  buildDeleteRoomSlot: jest.fn(),
}) );

jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(),
}) );

describe("RoomSlots page test", () => {
  const roomSlotList = [
    {
      location: "Library",
      quarter: "S21",
      dayOfWeek: "Monday",
      startTime: "P",
      endTime: "P",
    },
  ];

  const user = {
    name: "test user",
  };

  const getAccessTokenSilentlySpy = jest.fn();
  const mutateSpy = jest.fn();

  beforeEach(() => {
    useAuth0.mockReturnValue({
      admin: undefined,
      getAccessTokenSilently: getAccessTokenSilentlySpy,
      user: user
    });
    useSWR.mockReturnValue({
      data: roomSlotList,
      error: undefined,
      mutate: mutateSpy,
    });
  });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test("renders without crashing", () => {
      render(<RoomSlots />);
    });

    test("renders loading while room slots list is undefined", () => {
      useSWR.mockReturnValue({
        data: undefined,
        error: undefined,
        mutate: mutateSpy,
      });
      const { getByAltText } = render(<RoomSlots />);
      const loading = getByAltText("Loading");
      expect(loading).toBeInTheDocument();
    });

    test("renders an error message when there is an error", () => {
      useSWR.mockReturnValue({
        data: undefined,
        error: new Error("this is an error"),
        mutate: mutateSpy,
      });
      const { getByText } = render(<RoomSlots />);
      const error = getByText(/error/);
      expect(error).toBeInTheDocument();
    });

  //   test("can delete an office hour", async () => {
  //     const fakeDeleteFunction = jest.fn();
  //     buildDeleteOfficeHour.mockReturnValue(fakeDeleteFunction);
  //     const { getAllByTestId } = render(<OfficeHours />);
  //     const deleteButtons = getAllByTestId("delete-button");
  //     userEvent.click(deleteButtons[0]);
  //     await waitFor(() => expect(fakeDeleteFunction).toHaveBeenCalledTimes(1));
  //   });
  
  //   test("can click to add an office hour", async () => {
  
  //     const pushSpy = jest.fn();
  //     useHistory.mockReturnValue({
  //       push: pushSpy
  //     });
  
  //     const { getByText } = render(<OfficeHours />);
  //     const newOfficeHourButton = getByText("New Office Hour");
  //     userEvent.click(newOfficeHourButton);
  
  //     await waitFor(() => expect(pushSpy).toHaveBeenCalledTimes(1));
  //   });

});