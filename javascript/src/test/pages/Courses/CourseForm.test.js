import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CourseForm } from "main/pages/Courses/CourseForm";

describe("CourseForm tests", () => {
  test("renders without crashing", () => {
    render(<CourseForm />);
  });

  test("can type and submit form", () => {
    const addCourse = jest.fn();
    render(<CourseForm addCourse={addCourse} />);
    const input = screen.getByPlaceholderText("add course");
    const input2 = screen.getByPlaceholderText("quarter");
    const input3 = screen.getByPlaceholderText("instructor first name");
    const input4 = screen.getByPlaceholderText("instructor last name");
    const input5 = screen.getByPlaceholderText("instructor email");
    const submit = screen.getByText("Submit");
    userEvent.type(input, "new course");
    userEvent.type(input2, "new quarter");
    userEvent.type(input3, "new fname");
    userEvent.type(input4, "new lname");
    userEvent.type(input5, "new email");
    userEvent.click(submit);
    expect(addCourse).toHaveBeenCalledTimes(1);
  });
});
