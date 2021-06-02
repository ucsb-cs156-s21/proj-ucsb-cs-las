import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RoomSlotSelector from "main/components/RoomSlots/RoomSlotSelector";
import roomSlotFixtures from "fixtures/roomSlotFixtures";

import { asHumanQuarter } from "main/utils/quarter";
import { toAMPMFormat } from "main/utils/RoomSlotTableHelpers";
jest.mock("main/utils/quarter");
jest.mock("main/utils/RoomSlotTableHelpers");

describe("RoomSlotSelector tests", () => {
    beforeEach(() => {
        asHumanQuarter.mockImplementation((quarter) => {
            return quarter;
        });
        toAMPMFormat.mockImplementation((time) => {
            return time;
        })
    });

    test("renders usable selector with proper option text", async () => {
        const onChange = jest.fn();

        const { getByTestId, getByText } = render(
            <RoomSlotSelector
                data-testid="room-slot-selector"
                roomSlots={roomSlotFixtures.multipleRoomSlots}
                onChange={onChange}
            />
        );

        let selector = getByTestId("room-slot-selector");

        userEvent.selectOptions(selector, getByText("20212 Library Monday 08:00:00-15:00:00"))
        expect(onChange).toHaveBeenCalledWith("1");

        userEvent.selectOptions(selector, getByText("20212 HSSB Tuesday 08:00:00-15:00:00"));
        expect(onChange).toHaveBeenCalledWith("2");
    });
});