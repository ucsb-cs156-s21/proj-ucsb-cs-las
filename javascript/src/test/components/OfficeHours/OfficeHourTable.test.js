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



  test("renders without crashing", () => {
    render(<OfficeHourTable officeHours = {sampleOfficeHour}/>);
  });

  //test the presence of new <a> tag
  // test("render the zoomLinkFormatter", () => {
  //   const expectedLink = "https://anc.zoom.com";
  //   const cellContent = "test.zoom.com";
  //   const row = 0;
  //   const actual = zoomRoomLinkFormatter(cellContent, row);

  //   expect(actual).toEqual(expectedLink);
  // });


});
