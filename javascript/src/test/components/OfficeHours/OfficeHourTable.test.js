import React from "react";
import { waitFor, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OfficeHourTable from "main/components/OfficeHours/OfficeHourTable";
import { useHistory } from "react-router-dom";
jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(),
}));


describe("OfficeHour table tests", () => {

  const sampleOfficeHour = [{
    "id": 2,
    "name": "CMPSC 156",
    "quarter": "F20",
    "instructorFirstName": "Phill",
    "instructorLastName": "Conrad",
    "instructorEmail": "phtcon@ucsb.edu"
  }]

  const testZoomLinkOfficeHour = [{
    "id": 1,
    "startTime": "12pm",
    "endTime": "1pm",
    "dayOfWeek": "Mon",
    "zoomRoomLink": "test.zoom.com",
  }]

  test("renders without crashing", () => {
    render(<OfficeHourTable officeHours = {sampleOfficeHour}/>);
  });

  test("renders with edit buttons when admin true", async () =>{   
    const pushSpy = jest.fn();
    useHistory.mockReturnValue({
      push: pushSpy
    });
    const {getByTestId} = render(<OfficeHourTable officeHours = { sampleOfficeHour } admin = {true}/>);
    const editButton = getByTestId('edit-button-2');
    expect(editButton).toBeInTheDocument();
    userEvent.click(editButton);
    await waitFor(() => expect(pushSpy).toHaveBeenCalledTimes(1));

  });


  test("test Zoom Link Clickable", () => {
    const expectedLink = "test.zoom.com";
    const { getByText } = render(<OfficeHourTable officeHours = { testZoomLinkOfficeHour }/>);
    const actual = getByText("test.zoom.com").closest('a').getAttribute("href");
    expect(actual).toEqual(expectedLink);
  });


});
