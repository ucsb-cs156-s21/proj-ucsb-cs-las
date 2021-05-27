import React from "react";
import { render, waitFor } from "@testing-library/react";
import OfficeHourForm from "main/components/OfficeHours/OfficeHourForm";
import userEvent from "@testing-library/user-event";

import { quarterProvider, courseProvider, tutorAssignmentProvider } from "main/services/selectorSupport"
jest.mock("main/services/selectorSupport");

const sampleOfficeHour = {
  "id": "",
  "startTime": "2:00PM",
  "endTime": "3:00PM",
  "dayOfWeek": "Wednesday",
  "zoomRoomLink": "https://ucsb.zoom.us.test",
  "notes": "noted",
  "tutorAssignment": {
    "id": 2,
  },

}

describe("OfficeHourForm tests", () => {

  beforeEach(() => {
    quarterProvider.mockResolvedValue(["20201"]);
    courseProvider.mockResolvedValue([{ id: 1, name: "CMPSC 156" }]);
    tutorAssignmentProvider.mockResolvedValue([{ id: 2, tutor: { firstName: "Chris", lastName: "McTutorface" } }]);
  });

  const selectTutor = async (getByPlaceholderText, getByText) => {
    await waitFor(() => expect(quarterProvider).toHaveBeenCalledTimes(1));

    userEvent.click(getByPlaceholderText("Select a tutor"));
    userEvent.click(getByText("Winter 2020"));

    await waitFor(() => expect(courseProvider).toHaveBeenCalledWith("20201"));

    userEvent.click(getByText("CMPSC 156"));

    await waitFor(() => expect(tutorAssignmentProvider).toHaveBeenCalledWith(1));

    userEvent.click(getByText("Chris McTutorface"));
  }

  test("component renders without crashing", async () => {
    render(<OfficeHourForm />);
    await waitFor(() => expect(quarterProvider).toHaveBeenCalledTimes(1));
  });

  test("creating OfficeHours works", async () => {

    const createOfficeHourMock = jest.fn();

    const { getByPlaceholderText, getByLabelText, getByText } = render
      (<OfficeHourForm createOfficeHour={createOfficeHourMock} />)
      ;

    await selectTutor(getByPlaceholderText, getByText);

    const startTimeInput = getByLabelText("Start Time");
    userEvent.type(startTimeInput, sampleOfficeHour.startTime);

    const endTimeInput = getByLabelText("End Time");
    userEvent.type(endTimeInput, sampleOfficeHour.endTime);

    const selectDayOfWeek = getByLabelText("Day of Week")
    userEvent.selectOptions(selectDayOfWeek, sampleOfficeHour.dayOfWeek);

    const zoomRoomLinkInput = getByLabelText("Zoom Room Link");
    userEvent.type(zoomRoomLinkInput, sampleOfficeHour.zoomRoomLink);

    const notesInput = getByLabelText("Notes");
    userEvent.type(notesInput, sampleOfficeHour.notes);

    const submitButton = getByText("Submit");
    userEvent.click(submitButton);

    expect(createOfficeHourMock).toHaveBeenCalledTimes(1);
    expect(createOfficeHourMock).toHaveBeenCalledWith(sampleOfficeHour);
  });

  test("creating OfficeHours with wrong time", async () => {

    const createOfficeHourMock = jest.fn();

    const { getByPlaceholderText, getByLabelText, getByText } = render
      (<OfficeHourForm createOfficeHour={createOfficeHourMock} />)
      ;

    await selectTutor(getByPlaceholderText, getByText);

    const startTimeInput = getByLabelText("Start Time");
    userEvent.type(startTimeInput, "12:60PM");

    const endTimeInput = getByLabelText("End Time");
    userEvent.type(endTimeInput, "01:00PM");

    const zoomRoomLinkInput = getByLabelText("Zoom Room Link");
    userEvent.type(zoomRoomLinkInput, sampleOfficeHour.zoomRoomLink);

    const notesInput = getByLabelText("Notes");
    userEvent.type(notesInput, sampleOfficeHour.notes);

    const submitButton = getByText("Submit");
    userEvent.click(submitButton);

    expect(createOfficeHourMock).toHaveBeenCalledTimes(0);
  });

  test("creating OfficeHours with invalid Zoom Room Link", async () => {

    const createOfficeHourMock = jest.fn();

    const {getByPlaceholderText, getByLabelText, getByText } = render
      (<OfficeHourForm createOfficeHour={createOfficeHourMock} />)
      ;

    await selectTutor(getByPlaceholderText, getByText);

    const startTimeInput = getByLabelText("Start Time");
    userEvent.type(startTimeInput, sampleOfficeHour.startTime);

    const endTimeInput = getByLabelText("End Time");
    userEvent.type(endTimeInput, sampleOfficeHour.endTime);

    const zoomRoomLinkInput = getByLabelText("Zoom Room Link");
    userEvent.type(zoomRoomLinkInput, "invalid.zoom.link");

    const notesInput = getByLabelText("Notes");
    userEvent.type(notesInput, sampleOfficeHour.notes);

    const submitButton = getByText("Submit");
    userEvent.click(submitButton);

    expect(createOfficeHourMock).toHaveBeenCalledTimes(0);
  });

});
