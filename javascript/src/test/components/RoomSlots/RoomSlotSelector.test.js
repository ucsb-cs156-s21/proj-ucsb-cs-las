import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RoomSlotSelector from "main/components/RoomSlots/RoomSlotSelector";
import roomSlotFixtures from "fixtures/roomSlotFixtures";

import { asHumanQuarter } from "main/utils/quarter";
jest.mock("main/utils/quarter");

import { toAMPMFormat } from "main/utils/RoomSlotTableHelpers";
jest.mock("main/utils/RoomSlotTableHelpers");

describe("RoomSlotSelector tests", () => {
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