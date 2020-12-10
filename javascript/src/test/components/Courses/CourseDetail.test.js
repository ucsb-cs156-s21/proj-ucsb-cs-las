import React from "react";
import { waitFor, render } from "@testing-library/react";
import CourseDetail from "main/components/Courses/CourseDetail";
import { useParams} from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use real functions 
  useParams: jest.fn(), // except for just this one
}));

describe("Course Detail Page Test", () => { 
	test("renders without crashing", () => {
    	render(<CourseDetail />);
  	});
});
