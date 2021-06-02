import React from "react";
import RoomSlotTable from "main/components/RoomSlots/RoomSlotTable"
import { useHistory } from "react-router-dom";
import { waitFor, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(),
}));

describe("RoomSlotTable tests", () => {
    const slots = [
        {
            id: 1,
            location: "Library",
            quarter: "S21",
            dayOfWeek: "Monday",
            startTime: "08:00:00",
            endTime: "15:00:00",
        },
        {
            id: 2,
            location: "HSSB",
            quarter: "S21",
            dayOfWeek: "Tuesday",
            startTime: "08:00:00",
            endTime: "15:00:00",
        },

    ]


    const deleteRoomSlot = jest.fn();
    test("renders without crashing", () => {
    render(<RoomSlotTable roomSlots={slots} admin={true} deleteRoomSlot={deleteRoomSlot} />);
  });

    test("renders without crashing not admin", () => {
    render(<RoomSlotTable roomSlots={slots} admin={false} deleteRoomSlot={deleteRoomSlot} />);
    });
  
    test("renders with delete buttons when admin true", async () => {
    const pushSpy = jest.fn();
    useHistory.mockReturnValue({
      push: pushSpy
    });
    const { getByTestId } = render(<RoomSlotTable roomSlots={slots} admin={true} deleteRoomSlot={deleteRoomSlot}/>);
    const deleteButton = getByTestId('delete-button-1');
    expect(deleteButton).toBeInTheDocument();
    userEvent.click(deleteButton);
    await waitFor(() => expect(pushSpy).toHaveBeenCalledTimes(1));

  });

});