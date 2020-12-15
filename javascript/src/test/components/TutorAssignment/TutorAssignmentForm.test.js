import React from "react";
import { render, waitFor } from "@testing-library/react";
import useSWR from "swr";
jest.mock("swr");
import TutorAssignmentForm from "main/components/TutorAssignment/TutorAssignmentForm";
import userEvent from "@testing-library/user-event";

describe("TutorAssignmentForm tests", () => {
    const courses = [
        {
        name: "CMPSC 156",
        id: 1,
        quarter: "20202",
        instructorFirstName: "Phill",
        instructorLastName: "Conrad",
        instructorEmail: "phtcon@ucsb.edu",
        },
        {
        name: "CMPSC 148",
        id: 2,
        quarter: "20203",
        instructorFirstName: "Chandra",
        instructorLastName: "Krintz",
        instructorEmail: "krintz@example.org",
        },
    ];

    const sampleTutorAssignment = {
          id: 1,
          course:  {name: "CMPSC 148",
                    id: 2,
                    quarter: "20203",
                    instructorFirstName: "Chandra",
                    instructorLastName: "Krintz",
                    instructorEmail: "krintz@example.org",
                    },
          tutor:    {email: "scottpchow@ucsb.edu",
                    firstName: "Scott",
                    id: 1,
                    lastName: "Chow"},
          tutorEmail:   "scottpchow@ucsb.edu", 
          assignmentType: "TA"
        };

    const sampleTutorAssignment2 = {
      id: 1,
      course:  {name: "CMPSC 148",
                id: 2,
                quarter: "20203",
                instructorFirstName: "Chandra",
                instructorLastName: "Krintz",
                instructorEmail: "krintz@example.org",
                },
        tutor:  {email: "scottpchow@ucsb.edu",
                firstName: "Scott",
                id: 1,
                lastName: "Chow"},
        assignmentType: "TA",
        tutorEmail: "scottpchow@ucsb.edu",
        index: 1,
      };    

    const mutateSpy = jest.fn();
    beforeEach(() => {
        useSWR.mockReturnValue({
            data: courses,
            error: undefined,
            mutate: mutateSpy,
        });
    });

  test("empty component renders without crashing", () => {
    render(<TutorAssignmentForm />);
  });

  test("component with existing course renders without crashing", () => {
    render(<TutorAssignmentForm existingTutorAssignment={sampleTutorAssignment}/>);
  });

  test("error mesage appears if you are a member but not an admin or instructor", () => {
    useSWR.mockReturnValue({
        data: undefined,
        error: true,
        mutate: mutateSpy,
    });
    const { getByText } = render(<TutorAssignmentForm />);
    const errorMessage = getByText("You must be an instructor or an admin to create new Tutor Assignments.");
    expect(errorMessage).toBeInTheDocument();
  });

  test("loading appears if course list is not returned yet", () => {
    useSWR.mockReturnValue({
        data: undefined,
        error: undefined,
        mutate: mutateSpy,
    });
    const { getByAltText } = render(<TutorAssignmentForm />);
    const loading = getByAltText("Loading");
    expect(loading).toBeInTheDocument();
  });

  test("creating TutorAssignment works", async () => {

    const createTutorAssignmentMock = jest.fn();

    const { getByLabelText, getByText } = render
      (<TutorAssignmentForm createTutorAssignment={createTutorAssignmentMock} />)
    ;

    const courseSelect = getByLabelText("Course Name");
    userEvent.selectOptions(courseSelect, "1");

    const tutorInput = getByLabelText("Tutor Email");
    userEvent.type(tutorInput, sampleTutorAssignment.tutorEmail);

    const assignSelect = getByLabelText("Assignment Type");
    userEvent.selectOptions(assignSelect, sampleTutorAssignment.assignmentType);

    const submitButton = getByText("Submit");
    userEvent.click(submitButton);

    expect(createTutorAssignmentMock).toHaveBeenCalledTimes(1);
    expect(createTutorAssignmentMock).toHaveBeenCalledWith({ ... sampleTutorAssignment, id: null, index: "1", tutor: null});
  });


});