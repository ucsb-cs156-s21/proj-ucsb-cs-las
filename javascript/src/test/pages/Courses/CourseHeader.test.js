import React from "react";
import { render } from "@testing-library/react";
import { CourseHeader } from "main/pages/Courses/CourseHeader";

describe("CourseHeader tests", () => {
  test("renders without crashing", () => {
    render(<CourseHeader />);
  });
});
