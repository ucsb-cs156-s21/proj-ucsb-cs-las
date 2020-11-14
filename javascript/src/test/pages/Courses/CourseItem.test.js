import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("CourseItem tests", () => {
  test("renders without crashing", () => {
    const props = {
      item: {
        name: "name",
        id: 1,
        quarter: "quarter",
        instructorFirstName: "instrfname",
        instructorLastName: "instrlname",
        instructorEmail: "instremail",
      },
      index: 0,
      updateCourse: jest.fn(),
      deleteCourse: jest.fn(),
    };
    render(<CourseItem {...props} />);
  });

  test("renders complete item correctly", () => {
    const props = {
      item: {
        name: "name",
        id: 1,
        quarter: "quarter",
        instructorFirstName: "instrfname",
        instructorLastName: "instrlname",
        instructorEmail: "instremail",
      },
      index: 0,
      updateCourse: jest.fn(),
      deleteCourse: jest.fn(),
    };
    const { getByDisplayValue } = render(<CourseItem {...props} />);
    const item = getByDisplayValue(props.item.name);
    expect(item).toBeInTheDocument();
  });

  
  test("clicking on delete button triggers deleteCourse", () => {
    const props = {
      item: {
        name: "name",
        id: 1,
        quarter: "quarter",
        instructorFirstName: "instrfname",
        instructorLastName: "instrlname",
        instructorEmail: "instremail",
      },
      index: 0,
      updateCourse: jest.fn(),
      deleteCourse: jest.fn(),
    };
    render(<CourseItem {...props} />);
    userEvent.click(screen.getByText(/Delete/));
    expect(props.deleteCourse).toHaveBeenCalledTimes(1);
  });
});
