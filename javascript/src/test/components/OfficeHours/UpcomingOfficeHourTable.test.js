import React from "react";
import { render } from "@testing-library/react";
import UpcomingOfficeHourTable from "main/components/OfficeHours/UpcomingOfficeHourTable";

describe("UpcomingOfficeHour table tests", () => {

  const sampleUpcomingOfficeHourOne = [{
    "id": 1,
    "dayOfWeek": "Monday",
    "startTime": "12pm",
    "endTime": "1pm",
    "tutorName": "Phill Conrad",
    "courseNameYear": "CMPSC 156 Winter 2020",
  }]

  const sampleUpcomingOfficeHourTwo = [{
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
    render(<UpcomingOfficeHourTable upcomingOfficeHours = {sampleUpcomingOfficeHourOne} isMember = {false}/>);
  });

  test("renders when logged in without crashing", async () =>{
    render(<UpcomingOfficeHourTable upcomingOfficeHours = {sampleUpcomingOfficeHourTwo} isMember = {true}/>);
  });

  test("test Zoom Link Clickable when logged in", () => {
    const expectedLink = "test.zoom.com";
    const { getByText } = render(<UpcomingOfficeHourTable upcomingOfficeHours = {sampleUpcomingOfficeHourTwo} isMember = {true}/>);
    const actual = getByText("test.zoom.com").closest('a').getAttribute("href");
    expect(actual).toEqual(expectedLink);
  });
});
