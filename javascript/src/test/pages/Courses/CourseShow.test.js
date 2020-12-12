import React from "react";
import { waitFor, render } from "@testing-library/react";
import CourseShow from "main/pages/Courses/CourseShow";
import { useParams} from "react-router-dom";
import CourseDetail from "main/components/Courses/CourseDetail";
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), 
  useParams: jest.fn(), 
}));

describe("Course Show Page Test", () => { 
	const course =
	{
	  name: "CMPSC 156",
	  id: 1,
	  quarter: "F20",
	  instructorFirstName: "Phill",
	  instructorLastName: "Conrad",
	  instructorEmail: "phtcon@ucsb.edu",
	};
	const user = {
	  name: "test user",
	};
	const getAccessTokenSilentlySpy = jest.fn();
	const mutateSpy = jest.fn();

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