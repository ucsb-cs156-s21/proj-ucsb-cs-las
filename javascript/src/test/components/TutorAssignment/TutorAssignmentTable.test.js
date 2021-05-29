import React from "react";
import { waitFor, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TutorAssignmentTable from "main/components/TutorAssignment/TutorAssignmentTable";
import { useHistory } from "react-router-dom";
jest.mock("swr");
jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(),
}));


describe("CourseForm tests", () => {
    const tutorAssignments = [
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
          assignmentType: "TA",
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
          assignmentType: "TA",
        }
      ];
  const deleteTutorAssignment = jest.fn();
  test("renders without crashing", () => {

    render(<TutorAssignmentTable tutorAssignments={tutorAssignments} isInstructor={false} deleteTutorAssignment={deleteTutorAssignment} />);
  });

  test("renders delete and edit for admin/instructor", async () => {
    const pushSpy = jest.fn();
    useHistory.mockReturnValue({
      push: pushSpy
    });

    const {getByTestId} = render(<TutorAssignmentTable tutorAssignments={tutorAssignments} isInstructor={true} deleteTutorAssignment={deleteTutorAssignment} />);
    const editButton = getByTestId('edit-button-1');
    userEvent.click(editButton);

    const deleteButton = getByTestId('delete-button1');
    userEvent.click(deleteButton);


    await waitFor(() => expect(pushSpy).toHaveBeenCalledTimes(1));
  });

  test("ascending and descending buttons for course can be pressed", () => {

    const { getByText } = render(<TutorAssignmentTable tutorAssignments={tutorAssignments} isInstructor={true} />);
    const tutorAssignmentHeader = getByText(/Course/);

    //cycle through both ascending and descending for test coverage
    userEvent.click(tutorAssignmentHeader);
    userEvent.click(tutorAssignmentHeader);
    const descendingOFF = String.fromCharCode(0x25bd);
    expect(getByText(descendingOFF)).toBeInTheDocument();

  });

  test("ascending and descending buttons for tutor can be pressed", () => {

    const { getByText } = render(<TutorAssignmentTable tutorAssignments={tutorAssignments} isInstructor={true} />);
    const tutorAssignmentHeader = getByText(/Tutor/);

    //cycle through both ascending and descending for test coverage
    userEvent.click(tutorAssignmentHeader);
    userEvent.click(tutorAssignmentHeader);
    const descendingOFF = String.fromCharCode(0x25bd);
    expect(getByText(descendingOFF)).toBeInTheDocument();

  });

});