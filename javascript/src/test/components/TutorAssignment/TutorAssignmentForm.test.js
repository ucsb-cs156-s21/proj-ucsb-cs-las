import React from "react";
import { render, waitFor } from "@testing-library/react";
import TutorAssignmentForm from "main/components/TutorAssignment/TutorAssignmentForm";
import userEvent from "@testing-library/user-event";

describe("TutorAssignmentForm tests", () => {
  
  const sampleTutorAssignment = {
    "id": 1,
    "course": "CMPSC 56",
    "tutor": "vanbrocklin@ucsb.edu",
    "assignmentType": "LA",
  }

  test("empty component renders without crashing", () => {
    render(<TutorAssignmentForm />);
  });

  test("component with existing course renders without crashing", () => {
    render(<TutorAssignmentForm existingTutorAssignment={sampleTutorAssignment}/>);
  });

  test("updating TutorAssignment name works", async () => {

    const updateTutorAssignmentMock = jest.fn();

    const { getByText, getByDisplayValue } = render
      (<CourseForm updateTutorAssignment={updateTutorAssignmentMock} existingTutorAssignment={sampleTutorAssignment}/>)
    ;

    const updatedTutorAssignment = {
      ...sampleTutorAssignment,
      course: "new CMPSC 156",
    };

    const input = getByDisplayValue(sampleTutorAssignment.course);
    userEvent.clear(input);
    userEvent.type(input, updatedTutorAssignment.course);

    const submitButton = getByText("Submit");
    userEvent.click(submitButton);

    expect(updateTutorAssignmentMock).toHaveBeenCalledTimes(1);
    expect(updateTutorAssignmentMock).toHaveBeenCalledWith(updatedTutorAssignment, updatedTutorAssignment.id);

  });

  test("creating TutorAssignment works", async () => {

    const createTutorAssignmentMock = jest.fn();

    const { getByLabelText, getByText } = render
      (<TutorAssignmentForm createTutorAssignment={createTutorAssignmentMock} />)
    ;

    const courseInput = getByLabelText("Course Name");
    userEvent.type(courseInput, sampleTutorAssignment.course);

    const tutorInput = getByLabelText("Tutor Email");
    userEvent.type(tutorInput, sampleTutorAssignment.tutor);

    const assignInput = getByLabelText("Assignment Type");
    userEvent.type(assignInput, sampleTutorAssignment.assignmentType);

    const submitButton = getByText("Submit");
    userEvent.click(submitButton);

    expect(createTutorAssignmentMock).toHaveBeenCalledTimes(1);
    expect(createTutorAssignmentMock).toHaveBeenCalledWith({ ... sampleTutorAssignment, id: undefined });
  });
});