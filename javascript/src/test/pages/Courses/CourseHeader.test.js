import React from "react";
import { render } from "@testing-library/react";

describe("CourseHeader tests", () => {
  test("renders without crashing", () => {
    render(<CourseHeader />);
  });
});
