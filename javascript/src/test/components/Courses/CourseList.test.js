import React from "react";
import { render } from "@testing-library/react";
import CourseList from "main/components/Footer/AppFooter";

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
	test("renders without crashing on empty list", () => {
		render(<CourseList courses={[]}/>);
	});
});
