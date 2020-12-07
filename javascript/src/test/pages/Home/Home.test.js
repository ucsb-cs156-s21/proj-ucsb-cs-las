import React from "react";
import { render } from "@testing-library/react";
import Home from "main/pages/Home/Home";
import CourseTable from "main/components/Courses/CourseTable";
import userEvent from "@testing-library/user-event";

describe("Home tests", () => {
  test("renders without crashing", () => {
    render(<Home/>);



describe("CourseForm tests", () => {

  const courseList = [];
  const deleteCourse = jest.fn();
  test("renders without crashing", () => {
    render(<CourseTable courses={courseList} admin={true} deleteCourse={deleteCourse} />);
  });

  test("ascending and descending buttons can be pressed", () => {
    const { getByText } = render(<CourseTable courses={courseList} admin={true} deleteCourse={deleteCourse} />);
    const courseNumberHeader = getByText(/Course Number/);

    //cycle through both ascending and descending for test coverage
    userEvent.click(courseNumberHeader);
    userEvent.click(courseNumberHeader);

  });

});
