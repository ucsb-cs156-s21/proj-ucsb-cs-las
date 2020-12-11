import React from "react";
import { render } from "@testing-library/react";
// import CourseList from "main/components/Courses/CourseList";
import CourseList from "main/components/Footer/AppFooter";
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(), // and this one too
  Link: jest.fn() // and this one too
}));



describe("CourseList tests", () => {
  test("renders without crashing", () => {
    render(<CourseList />);
  });
});
