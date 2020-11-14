import React from "react";
import { render } from "@testing-library/react";
import CourseTable from "main/components/Footer/AppFooter";


describe("CourseForm tests", () => {
  test("renders without crashing", () => {
    render(<CourseTable />);
  });
});
