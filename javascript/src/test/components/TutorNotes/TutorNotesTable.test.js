import React from "react";
import { render } from "@testing-library/react";
import TutorNotesTable from "main/components/TutorNotes/TutorNotesTable";
import { useHistory } from "react-router-dom";
jest.mock("swr");
jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(),
}));


describe("TutorNotesForm tests", () => {
    const tutorNotes =
      {
        "id": 123,
        "onlineOfficeHours": {
          "id": 122,
          "tutorAssignment": {
            "id": 121,
            "course": {
              "id": 109,
              "name": "CMPSC 156",
              "quarter": "20212",
              "instructorFirstName": "Phill",
              "instructorLastName": "Conrad",
              "instructorEmail": "phtcon@ucsb.edu"
            },
            "tutor": {
              "id": 120,
              "firstName": "Phill",
              "lastName": "Conrad",
              "email": "phtcon@ucsb.edu"
            },
            "assignmentType": "TA"
          },
          "dayOfWeek": "Saturday",
          "startTime": "3:00PM",
          "endTime": "4:00PM",
          "zoomRoomLink": "",
          "notes": ""
        },
        "message": "Hello World"
        };

  test("renders without crashing", () => {

    render(<TutorNotesTable tutorNotes={[tutorNotes]} isInstructor={false}/>);
  });

  test("renders with null tutorNotes", () => {

    render(<TutorNotesTable tutorNotes={null} isInstructor={false}/>);
  });

  test("renders delete", async () => {
    const pushSpy = jest.fn();
    useHistory.mockReturnValue({
      push: pushSpy
    });

  });

});