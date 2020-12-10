import React from "react";
import { waitFor, render } from "@testing-library/react";
import useSWR from "swr";
jest.mock("swr");
import { useAuth0 } from "@auth0/auth0-react";
import { useParams} from "react-router-dom";
jest.mock("@auth0/auth0-react");
import CourseShow from "main/pages/Courses/CourseShow";
import userEvent from "@testing-library/user-event";
import { fetchWithToken } from "main/utils/fetch";
jest.mock("main/utils/fetch");

import { useHistory } from "react-router-dom";
jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use real functions 
  useParams: jest.fn(), // except for just this one
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
    
	test("empty component renders without crashing", () => {
		render(<CourseShow />);
	});
	
	test("component with existing course renders without crashing", () => {
		render(<CourseShow existingCourse={sampleCourse}/>);
    });
      
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
