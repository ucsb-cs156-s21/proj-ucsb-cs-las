import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CourseEditForm from "main/pages/Courses/CourseEditForm";

describe("Course Edit Form tests", () => {
  const item = {
    name: "course name",
    id: 1,
    quarter: "updated quarter",
    instructorFirstName: "updated fname",
    instructorLastName: "updated lname",
    instructorEmail: "updated email",
  };
  const update = jest.fn();

  const props = {
    item,
    update,
  };

  test("renders without crashing", () => {
    render(<CourseEditForm {...props} />);
  });

  test("there should be an edit button on the form", () => {
    const { getByText } = render(<CourseEditForm {...props} />);
    const editButton = getByText("Edit");
    expect(editButton).toBeInTheDocument();
  });

  test("clicking on the edit button should change the button to show done instead", () => {
    const { getByText } = render(<CourseEditForm {...props} />);
    const editButton = getByText("Edit");
    userEvent.click(editButton);
  });

  test("going into edit mode, updating the value, and clicking done behaves correctly", () => {
    const { getByText, getByDisplayValue } = render(
      <CourseEditForm {...props} />
    );
    const updatedItem = {
      ...item,
      name: "updated course",
      quarter: "updated quarter",
      instructorFirstName: "updated fname",
      instructorLastName: "updated lname",
      instructorEmail: "updated email",
    };

    const editButton = getByText("Edit");
    userEvent.click(editButton);
    const input = getByDisplayValue(item.name);
    userEvent.clear(input);
    userEvent.type(input, updatedItem.name);

    const doneButton = getByText("Done");
    userEvent.click(doneButton);

    const editButtonAfterDone = getByText("Edit");
    expect(editButtonAfterDone).toBeInTheDocument();

    expect(update).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledWith(updatedItem, updatedItem.id);
  });

  test("should not be able to update the course with an empty string for the value", () => {
    const { getByText, getByDisplayValue } = render(
      <CourseEditForm {...props} />
    );
    const updatedItem = {
      ...item,
      name: "updated course",
      quarter: "updated quarter",
      instructorFirstName: "updated fname",
      instructorLastName: "updated lname",
      instructorEmail: "updated email",
    };

    const editButton = getByText("Edit");
    userEvent.click(editButton);
    const input = getByDisplayValue(item.name);
    userEvent.clear(input);

    const doneButton = getByText("Done");
    userEvent.click(doneButton);

    expect(getByText("Done")).toBeInTheDocument();
    expect(update).toHaveBeenCalledTimes(0);
  });

  test("should not be able to update the course with an whitespace for the value", () => {
    const { getByText, getByDisplayValue } = render(
      <CourseEditForm {...props} />
    );
    const updatedItem = {
      ...item,
      name: "updated course",
      quarter: "updated quarter",
      instructorFirstName: "updated fname",
      instructorLastName: "updated lname",
      instructorEmail: "updated email",
    };

    const editButton = getByText("Edit");
    userEvent.click(editButton);
    const input = getByDisplayValue(item.name);
    userEvent.clear(input);
    userEvent.type(input, "     ");

    const doneButton = getByText("Done");
    userEvent.click(doneButton);

    expect(getByText("Done")).toBeInTheDocument();
    expect(update).toHaveBeenCalledTimes(0);
  });
});
