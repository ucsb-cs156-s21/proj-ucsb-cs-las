import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RoomSlotSelector from "main/components/RoomSlots/RoomSlotSelector";

import { asHumanQuarter } from "main/utils/quarter";
jest.mock("main/utils/quarter");

import { toAMPMFormat } from "main/utils/RoomSlotTableHelpers";
jest.mock("main/utils/RoomSlotTableHelpers");

describe("RoomSlotSelector tests", () => {
    const slots = [
        {
            id: 1,
            location: "Library",
            quarter: "S21",
            dayOfWeek: "MONDAY",
            startTime: "08:00:00",
            endTime: "15:00:00",
        },
        {
            id: 2,
            location: "HSSB",
            quarter: "S21",
            dayOfWeek: "TUESDAY",
            startTime: "08:00:00",
            endTime: "15:00:00",
        },
    ]

    beforeEach(() => {
        jest.clearAllMocks();
        asHumanQuarter.mockImplementation((quarter) => {
            return quarter;
        });
        toAMPMFormat.mockImplementation((time) => {
            return time;
        })
    });

    test("renders usable selector", () => {
        const onChange = jest.fn();

        const { getByPlaceholderText, getByText } = render(
            <RoomSlotSelector
                roomSlots={slots}
                onChange={onChange}
            />
        );

        userEvent.click(getByPlaceholderText("Select a room slot"));
        userEvent.click(getByText("S21 Library Monday 08:00:00-15:00:00"));
        expect(onChange).toHaveBeenCalledWith(1);

        userEvent.click(getByText("S21 HSSB Tuesday 08:00:00-15:00:00"));
        expect(onChange).toHaveBeenCalledWith(2);
    });
});