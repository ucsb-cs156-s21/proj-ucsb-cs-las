import React from "react";
import { render } from "@testing-library/react";
import RoomSlotTable from "main/components/RoomSlots/RoomSlotTable"

describe("RoomSlotTable tests", () => {
    const slots = [
        {
            location: "Library",
            quarter: "S21",
            dayOfWeek: "Monday",
            startTime: "Placeholder",
            endTime: "Placeholder",
        },
        {
            location: "HSSB",
            quarter: "S21",
            dayOfWeek: "Tuesday",
            startTime: "Placeholder",
            endTime: "Placeholder",
        },

    ]


    const deleteRoomSlot = jest.fn();
    test("renders without crashing", () => {
    render(<RoomSlotTable roomSlots={slots} admin={true} deleteRoomSlot={deleteRoomSlot} />);
  });

    test("renders without crashing not admin", () => {
    render(<RoomSlotTable roomSlots={slots} admin={false} deleteRoomSlot={deleteRoomSlot} />);
  });

});