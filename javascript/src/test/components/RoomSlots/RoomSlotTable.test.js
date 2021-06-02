import React from "react";
import { render } from "@testing-library/react";
import RoomSlotTable from "main/components/RoomSlots/RoomSlotTable"

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
    const { getByTestId } = render(<RoomSlotTable roomslots={slots} admin={true} deleteRoomSlot={deleteRoomSlot}/>);
    const deleteButton = getByTestId('delete-button-2');
    expect(deleteButton).toBeInTheDocument();
    userEvent.click(deleteButton);
    await waitFor(() => expect(pushSpy).toHaveBeenCalledTimes(1));

  });

});