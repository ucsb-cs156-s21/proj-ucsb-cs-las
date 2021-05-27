import React from "react";
import { render } from "@testing-library/react";
import CourseList from "main/components/Footer/AppFooter";

jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(), 
  Link: jest.fn() 
}));

describe("CourseList tests", () => {
	const courses = [
	  {
	    name: "CMPSC 156",
	    id: 1,
	    quarter: "F20",
	    instructorFirstName: "Phill",
	    instructorLastName: "Conrad",
	    instructorEmail: "phtcon@ucsb.edu",
	  },
	  {
	    name: "CMPSC 148",
	    id: 2,
	    quarter: "W21",
	    instructorFirstName: "Chandra",
	    instructorLastName: "Krintz",
	    instructorEmail: "krintz@example.org",
	  },
	];
	test("renders without crashing", () => {
		render(<CourseList courses={courses}/>);
	});
});
