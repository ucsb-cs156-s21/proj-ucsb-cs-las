
import React from "react";
import { render } from "@testing-library/react";
import useSWR from "swr";
import TutorNotesForm from "main/components/TutorNotes/TutorNotesForm";
import userEvent from "@testing-library/user-event";
import officeHoursFixtures from '../../../fixtures/officeHoursFixtures';
jest.mock("swr");

describe("TutorNotesForm tests", () => {
  const sampleOfficeHour = {
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
  };

    const sampleTutorNotes = {
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
    const mutateSpy = jest.fn();

  test("empty component renders without crashing", () => {
    useSWR.mockReturnValue({
      data: undefined,
      error: undefined,
      mutate: mutateSpy,
    });
    render(<TutorNotesForm />);
  });

  test("component with existing course renders without crashing", () => {
    useSWR.mockReturnValue({
      data: undefined,
      error: undefined,
      mutate: mutateSpy,
    });
    render(<TutorNotesForm existingTutorNotes={sampleTutorNotes}/>);
  });

  test("creating TutorNotes works", async () => {

    useSWR.mockReturnValue({
      data: [sampleOfficeHour],
      error: undefined,
      mutate: mutateSpy,
  });

    const createTutorNotesMock = jest.fn();

    const { getByLabelText, getByText } = render
      (<TutorNotesForm createTutorNotes={createTutorNotesMock} />)
    ;

    const officeHoursSelect = getByLabelText("Office Hours");
    userEvent.selectOptions(officeHoursSelect, "0");

    const messageInput = getByLabelText("Message");
    userEvent.type(messageInput, sampleTutorNotes.message)

    const submitButton = getByText("Submit");
    userEvent.click(submitButton);

    expect(createTutorNotesMock).toHaveBeenCalledTimes(1);
    expect(createTutorNotesMock).toHaveBeenCalledWith({ ...sampleTutorNotes, id: null, index: 0});
  });


});