import React from "react";
import { render } from "@testing-library/react";
import OfficeHourTable from "main/components/OfficeHours/OfficeHourTable";


describe("OfficeHour table tests", () => {

  const sampleOfficeHour = [{
    "id": 1,
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

  //test the presence of new <a> tag
  test("test Zoom Link Clickable", () => {
    const expectedLink = "test.zoom.com";
    const { getByText } = render(<OfficeHourTable officeHours = { testZoomLinkOfficeHour }/>);
    const actual = getByText("test.zoom.com").closest('a').getAttribute("href");
    expect(actual).toEqual(expectedLink);
  });


});
