import React from "react";
import { render } from "@testing-library/react";
import UpcomingOfficeHourTable from "main/components/OfficeHours/UpcomingOfficeHourTable";

describe("UpcomingOfficeHour table tests", () => {

  const sampleUpcomingOfficeHour = [{
    "id": 1,
    "dayOfWeek": "Monday",
    "startTime": "12pm",
    "endTime": "1pm",
    "tutorName": "Phill Conrad",
    "courseNameYear": "CMPSC 156 Winter 2020",
    "email": "phtcon@ucsb.edu",
    "zoomRoomLink": "test.zoom.com",
  }]

  test("renders without crashing", () => {
    render(<UpcomingOfficeHourTable upcomingOfficeHours = {sampleUpcomingOfficeHour} isMember = {false}/>);
  });

  test("renders when logged in without crashing", async () =>{
    render(<UpcomingOfficeHourTable upcomingOfficeHours = {sampleUpcomingOfficeHour} isMember = {true}/>);
  });

  test("test Zoom Link Clickable when logged in", () => {
    const expectedLink = "test.zoom.com";
    const { getByText } = render(<UpcomingOfficeHourTable upcomingOfficeHours = {sampleUpcomingOfficeHour}/>);
    const actual = getByText("test.zoom.com").closest('a').getAttribute("href");
    expect(actual).toEqual(expectedLink);
  });
});
