import React from "react";
import { render } from "@testing-library/react";
import CourseTable from "main/components/Courses/CourseTable"
import userEvent from "@testing-library/user-event";


describe("CourseForm tests", () => {
  const courses = [
    {
      name: "CMPSC 156",
      id: 1,
      quarter: "F20",
      instructorFirstName: "Phill",
      instructorLastName: "Conrad",
      instructorEmail: "phtcon@ucsb.edu",
    },
    {
      name: "CMPSC 148",
      id: 2,
      quarter: "F20",
      instructorFirstName: "Chandra",
      instructorLastName: "Krintz",
      instructorEmail: "krintz@example.org",
    },
  ];

  const deleteCourse = jest.fn();
  test("renders without crashing", () => {
    render(<CourseTable courses={courses} admin={true} deleteCourse={deleteCourse} />);
  });

  test("ascending and descending buttons can be pressed", () => {
    const { getByText } = render(<CourseTable courses={courses} admin={true} deleteCourse={deleteCourse} />);
    const courseNumberHeader = getByText(/Course Number/);

    //cycle through both ascending and descending for test coverage
    userEvent.click(courseNumberHeader);
    userEvent.click(courseNumberHeader);
    const descendingOFF = String.fromCharCode(0x25bd);
    expect(getByText(descendingOFF)).toBeInTheDocument();
  });

});
