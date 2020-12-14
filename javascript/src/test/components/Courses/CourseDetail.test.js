import React from "react";
import { render } from "@testing-library/react";
import CourseDetail from "main/components/Courses/CourseDetail";

describe("Course Detail Page Test", () => { 
	test("renders without crashing", () => {
    	render(<CourseDetail />);
  	});
});
