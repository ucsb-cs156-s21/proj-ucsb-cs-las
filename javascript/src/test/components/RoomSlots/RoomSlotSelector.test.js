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

    test("renders usable selector", async () => {
        const onChange = jest.fn();

        const { debug, getByText } = render(
            <RoomSlotSelector
                roomSlots={roomSlotFixtures.multipleRoomSlots}
                onChange={onChange}
            />
        );

        userEvent.click(getByText("20212 Library Monday 08:00:00-15:00:00"));
        expect(onChange).toHaveBeenCalledWith(1);

        userEvent.click(getByText("20212 HSSB Tuesday 08:00:00-15:00:00"));
        expect(onChange).toHaveBeenCalledWith(2);
    });
});