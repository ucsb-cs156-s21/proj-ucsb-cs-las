import React from "react";
import { render, waitForElement, waitFor } from "@testing-library/react";
import OfficeHourTable from "main/components/OfficeHours/OfficeHourTable";
import userEvent from "@testing-library/user-event";


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

/*  test("Test delete button calls func", () => {


    const deleteOfficeHourMock = jest.fn();
    const { findByText, getByDisplayValue } = render
      (<OfficeHourTable officeHours = {sampleOfficeHour} deleteOfficeHour = {deleteOfficeHourMock} admin = {true}/>)
    ;

    const deleteButton = getByDisplayValue("button");
    userEvent.click(deleteButton);
    expect(deleteOfficeHourMock).toHaveBeenCalled();
  });
  */


});
