import React from "react";
import { waitFor, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TutorNotesTable from "main/components/TutorNotes/TutorNotesTable";
import { useHistory } from "react-router-dom";
jest.mock("swr");
jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(),
}));


describe("CourseForm tests", () => {
    const tutorNotes = [
        {
          id: 1,
          course:  {name: "CMPSC 156",
                    id: 1,
                    quarter: "20202",
                    instructorFirstName: "Phill",
                    instructorLastName: "Conrad",
                    instructorEmail: "phtcon@ucsb.edu",
                    },
          tutor:   {email: "scottpchow@ucsb.edu",
                    firstName: "Scott",
                    id: 1,
                    lastName: "Chow"},
          message: "Random Message",
        },
        {  // New entry added to facilitate sort testing
          id: 2,
          course: {name: "PSTAT 120A",
                   id: 2,
                   quarter: "20203",
                   instructorFirstName: "Uma",
                   instructorLastName: "Ravat",
                   instructorEmail: "umaravat@ucsb.edu",
                  },
          tutor:  {email: "alexgerber@ucsb.edu",
                   firstName: "Alex",
                   id: 2,
                   lastName: "Gerber"},
          message: "Random Message 2",
        }
      ];

  test("renders without crashing", () => {

    render(<TutorNotesTable tutorNotes={tutorNotes} isInstructor={false}/>);
  });

  test("renders with null tutorNotes", () => {

    render(<TutorNotesTable tutorNotes={null} isInstructor={false}/>);
  });

  test("renders delete and edit for admin/instructor", async () => {
    const pushSpy = jest.fn();
    useHistory.mockReturnValue({
      push: pushSpy
    });

    const {getByTestId} = render(<TutorNotesTable tutorNotes={tutorNotes} isInstructor={true}/>);
    const editButton = getByTestId('edit-button-1');
    userEvent.click(editButton);

    await waitFor(() => expect(pushSpy).toHaveBeenCalledTimes(1));
  });

});