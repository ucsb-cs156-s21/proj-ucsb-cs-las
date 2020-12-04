import React from "react";
import { render } from "@testing-library/react";
import CourseTable from "main/components/Course/CourseTable";


describe("CourseForm tests", () => {
  test("renders without crashing", () => {
    render(<CourseTable />);
  });
});
