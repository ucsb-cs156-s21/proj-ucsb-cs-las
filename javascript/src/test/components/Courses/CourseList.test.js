import React from "react";
import { render } from "@testing-library/react";
import CourseList from "main/components/Footer/AppFooter";

jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(), // and this one too
  Link: jest.fn() // and this one too
}));



describe("CourseList tests", () => {
  test("renders without crashing", () => {
    render(<CourseList />);
  });
});
