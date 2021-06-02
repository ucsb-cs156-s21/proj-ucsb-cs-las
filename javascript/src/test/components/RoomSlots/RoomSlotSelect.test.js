import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RoomSlotSelect from "main/components/RoomSlots/RoomSlotSelect";

import { quarterProvider, roomSlotProvider } from "main/services/selectorSupport"
jest.mock("main/services/selectorSupport");


describe("RoomSlotSelect", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders a usable room slot UI", async () => {
    const onChange = jest.fn();
    quarterProvider.mockResolvedValue(["20201"]);
    roomSlotProvider.mockResolvedValue([{ id: 42, location: "location", quarter: "20201", dayOfWeek: "Monday", startTime: "1:00 PM", endTime: "3:00 PM"}]);
    const { getByPlaceholderText, getByText } = render(
      <RoomSlotSelect
        onChange={onChange}
      />
    );

    await waitFor(() => expect(quarterProvider).toHaveBeenCalledTimes(1));

    userEvent.click(getByPlaceholderText("Select a quarter"));
    userEvent.click(getByText("Winter 2020"));

    await waitFor(() => expect(roomSlotProvider).toHaveBeenCalledWith("20201"));
    userEvent.click(getByText("Monday"))

    expect(onChange).toHaveBeenCalledWith(42);
  });
});

