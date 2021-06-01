import RoomSlotForm from "main/components/RoomSlots/RoomSlotForm";
import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("RoomSlotForm tests", () => {
    const testRoomSlot = {
        location: "Phelps 1024",
        quarter: "F20",
        dayOfWeek: "Monday",
        startTime: "12:00PM",
        endTime: "12:50PM"
    }

    test("empty component renders without crashing", () => {
        render(<RoomSlotForm />);
    });

    test("form detects invalid input format", async () => {
        const createRoomSlotMock = jest.fn();

        const { getByLabelText, getByText } = render(
            <RoomSlotForm />
        );

        const locationInput = getByLabelText("Location");
        const quarterInput = getByLabelText("Quarter");
        const startTimeInput = getByLabelText("Start Time");
        const endTimeInput = getByLabelText("End Time");
        const dayOfWeekInput = getByLabelText("Day of Week");

        userEvent.type(locationInput, testRoomSlot.location);
        userEvent.type(quarterInput, "X2000");
        userEvent.type(startTimeInput, testRoomSlot.startTime);
        userEvent.type(endTimeInput, testRoomSlot.endTime);
        userEvent.type(dayOfWeekInput, testRoomSlot.dayOfWeek);

        const submitButton = getByText("Submit");
        userEvent.click(submitButton);

        expect(createRoomSlotMock).toBeCalledTimes(0);
        expect(quarterInput).toHaveClass("is-invalid");
    })

    test("creating room slot works F20", async () => {
        const createRoomSlotMock = jest.fn();

        const { getByLabelText, getByText } = render(
            <RoomSlotForm createRoomSlot={createRoomSlotMock} />
        );

        const locationInput = getByLabelText("Location");
        const quarterInput = getByLabelText("Quarter");
        const startTimeInput = getByLabelText("Start Time");
        const endTimeInput = getByLabelText("End Time");
        const dayOfWeekInput = getByLabelText("Day of Week");

        userEvent.type(locationInput, testRoomSlot.location);
        userEvent.type(quarterInput, "F20");
        userEvent.type(startTimeInput, testRoomSlot.startTime);
        userEvent.type(endTimeInput, testRoomSlot.endTime);
        userEvent.type(dayOfWeekInput, testRoomSlot.dayOfWeek);

        const submitButton = getByText("Submit");
        userEvent.click(submitButton);

        expect(createRoomSlotMock).toHaveBeenCalledTimes(1);
        expect(createRoomSlotMock).toHaveBeenCalledWith({
            ...testRoomSlot,
            quarter: "20204",
            dayOfWeek: "MONDAY",
            startTime: "12:00:00",
            endTime: "12:50:00"
        });
    });

    test("creating room slot works W21", async () => {
        const createRoomSlotMock = jest.fn();

        const { getByLabelText, getByText } = render(
            <RoomSlotForm createRoomSlot={createRoomSlotMock} />
        );

        const locationInput = getByLabelText("Location");
        const quarterInput = getByLabelText("Quarter");
        const startTimeInput = getByLabelText("Start Time");
        const endTimeInput = getByLabelText("End Time");
        const dayOfWeekInput = getByLabelText("Day of Week");

        userEvent.type(locationInput, testRoomSlot.location);
        userEvent.type(quarterInput, "W21");
        userEvent.type(startTimeInput, testRoomSlot.startTime);
        userEvent.type(endTimeInput, testRoomSlot.endTime);
        userEvent.type(dayOfWeekInput, testRoomSlot.dayOfWeek);

        const submitButton = getByText("Submit");
        userEvent.click(submitButton);

        expect(createRoomSlotMock).toHaveBeenCalledTimes(1);
        expect(createRoomSlotMock).toHaveBeenCalledWith({
            ...testRoomSlot,
            quarter: "20211",
            dayOfWeek: "MONDAY",
            startTime: "12:00:00",
            endTime: "12:50:00"
        });
    });

    test("creating room slot works S21", async () => {
        const createRoomSlotMock = jest.fn();

        const { getByLabelText, getByText } = render(
            <RoomSlotForm createRoomSlot={createRoomSlotMock} />
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
        userEvent.click(submitButton);

        expect(createRoomSlotMock).toHaveBeenCalledTimes(1);
        expect(createRoomSlotMock).toHaveBeenCalledWith({
            ...testRoomSlot,
            quarter: "20212",
            dayOfWeek: "MONDAY",
            startTime: "12:00:00",
            endTime: "12:50:00"
        });
    });

    test("creating room slot works M21", async () => {
        const createRoomSlotMock = jest.fn();

        const { getByLabelText, getByText } = render(
            <RoomSlotForm createRoomSlot={createRoomSlotMock} />
        );

        const locationInput = getByLabelText("Location");
        const quarterInput = getByLabelText("Quarter");
        const startTimeInput = getByLabelText("Start Time");
        const endTimeInput = getByLabelText("End Time");
        const dayOfWeekInput = getByLabelText("Day of Week");

        userEvent.type(locationInput, testRoomSlot.location);
        userEvent.type(quarterInput, "M21");
        userEvent.type(startTimeInput, testRoomSlot.startTime);
        userEvent.type(endTimeInput, testRoomSlot.endTime);
        userEvent.type(dayOfWeekInput, testRoomSlot.dayOfWeek);

        const submitButton = getByText("Submit");
        userEvent.click(submitButton);

        expect(createRoomSlotMock).toHaveBeenCalledTimes(1);
        expect(createRoomSlotMock).toHaveBeenCalledWith({
            ...testRoomSlot,
            quarter: "20213",
            dayOfWeek: "MONDAY",
            startTime: "12:00:00",
            endTime: "12:50:00"
        });
    });

})