import React from "react";
import { render } from "@testing-library/react";
// import CourseList from "main/components/Courses/CourseList";
import CourseList from "main/components/Footer/AppFooter";


describe("CourseList tests", () => {
  test("renders without crashing", () => {
    render(<CourseList />);
  });
});
