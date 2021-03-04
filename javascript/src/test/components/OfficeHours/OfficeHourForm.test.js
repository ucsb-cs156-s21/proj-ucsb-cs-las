import React from "react";
import { render } from "@testing-library/react";
import OfficeHourForm from "main/components/OfficeHours/OfficeHourForm";
import userEvent from "@testing-library/user-event";



const sampleOfficeHour = {
  "id": "",
  "startTime": "2:00PM",
  "endTime": "3:00PM",
  "dayOfWeek" : "Wednesday",
  "zoomRoomLink": "test.zoom.com",
  "notes" : "noted",
  "tutorAssignment":  {
        "id": "3",
   },

}

describe("OfficeHourForm tests", () => {



  test("component renders without crashing", () => {
    render(<OfficeHourForm />);
  });

  test("creating OfficeHours works", async () => {

    const createOfficeHourMock = jest.fn();

    const { getByLabelText, getByText } = render
      (<OfficeHourForm createOfficeHour={createOfficeHourMock} />)
    ;

    const idInput = getByLabelText("Tutor Assignment ID");
    userEvent.type(idInput, sampleOfficeHour.tutorAssignment.id);

    const startTimeInput = getByLabelText("Start Time");
     userEvent.type(startTimeInput, sampleOfficeHour.startTime);

   const endTimeInput = getByLabelText("End Time");
    userEvent.type(endTimeInput, sampleOfficeHour.endTime);

    const dayOfWeekInput = getByLabelText("Day of Week");
    userEvent.type(dayOfWeekInput, sampleOfficeHour.dayOfWeek);

    const zoomRoomLinkInput = getByLabelText("Zoom Room Link");
    userEvent.type(zoomRoomLinkInput, sampleOfficeHour.zoomRoomLink);

    const notesInput = getByLabelText("Notes");
    userEvent.type(notesInput, sampleOfficeHour.notes);

    const submitButton = getByText("Submit");
    userEvent.click(submitButton);

    expect(createOfficeHourMock).toHaveBeenCalledTimes(1);
    expect(createOfficeHourMock).toHaveBeenCalledWith(sampleOfficeHour);
  });


});
