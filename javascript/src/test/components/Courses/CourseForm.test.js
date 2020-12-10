import React from "react";
import { render, waitFor } from "@testing-library/react";
import CourseForm from "main/components/Courses/CourseForm";
import userEvent from "@testing-library/user-event";

describe("CourseForm tests", () => {

  const sampleCourse = {
    "id": 1,
    "name": "CMPSC 156",
    "quarter": "F20",
    "instructorFirstName": "Phill",
    "instructorLastName": "Conrad",
    "instructorEmail": "phtcon@ucsb.edu",
  };

  test("empty component renders without crashing", () => {
    render(<CourseForm />);
  });

  test("component with existing course renders without crashing", () => {
    render(<CourseForm existingCourse={sampleCourse}/>);
  });

  test("updating course name works", async () => {

    const updateCourseMock = jest.fn();

    const { getByText, getByDisplayValue } = render
      (<CourseForm updateCourse={updateCourseMock} existingCourse={sampleCourse}/>)
    ;

    const updatedCourse = {
      ...sampleCourse,
      name: "updated name",
    };

    const input = getByDisplayValue(sampleCourse.name);
    userEvent.clear(input);
    userEvent.type(input, updatedCourse.name);

    const submitButton = getByText("Submit");
    userEvent.click(submitButton);

    expect(updateCourseMock).toHaveBeenCalledTimes(1);
    expect(updateCourseMock).toHaveBeenCalledWith(updatedCourse, updatedCourse.id);

  });

  test("creating course works", async () => {

    const createCourseMock = jest.fn();

    const { getByLabelText, getByText } = render
      (<CourseForm createCourse={createCourseMock} />)
    ;

    const nameInput = getByLabelText("Course Name");
    userEvent.type(nameInput, sampleCourse.name);

    const quarterInput = getByLabelText("Quarter");
    userEvent.type(quarterInput, sampleCourse.quarter);

    const fnameInput = getByLabelText("First Name");
    userEvent.type(fnameInput, sampleCourse.instructorFirstName);

    const lnameInput = getByLabelText("Last Name");
    userEvent.type(lnameInput, sampleCourse.instructorLastName);

    const emailInput = getByLabelText("Email");
    userEvent.type(emailInput, sampleCourse.instructorEmail);

    const submitButton = getByText("Submit");
    userEvent.click(submitButton);

    expect(createCourseMock).toHaveBeenCalledTimes(1);
    expect(createCourseMock).toHaveBeenCalledWith({ ... sampleCourse, id: undefined });
  });
});
