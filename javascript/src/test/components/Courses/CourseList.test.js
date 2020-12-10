import React from "react";
import { render } from "@testing-library/react";
import CourseList from "main/components/Courses/CourseList";


describe("CourseList tests", () => {
  test("renders without crashing", () => {
    render(<CourseList />);
  });
});