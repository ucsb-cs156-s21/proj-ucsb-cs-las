import React from "react";
import { render } from "@testing-library/react";
import CourseShow from "main/pages/Courses/CourseShow";
import { useParams} from "react-router-dom";
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), 
  useParams: jest.fn(), 
}));

describe("Course Show Page Test", () => { 
	beforeEach(() => {
	  useParams.mockReturnValue({
	    courseId: '1'
	  });
	});

	afterEach(() => {
	  jest.clearAllMocks();
	});

	test("renders without crashing", () => {
      render(<CourseShow />);
  	});
});