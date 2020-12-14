import React from "react";
import { render} from "@testing-library/react";
import CourseDetail from "main/components/Courses/CourseDetail";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use real functions 
  useParams: jest.fn(), // except for just this one
}));

describe("Course Detail Test", () => { 
	const sampleCourse = {
		"id": 1,
		"name": "course 1",
		"quarter": "F20",
		"instructorFirstName": "fname",
		"instructorLastName": "lname",
		"instructorEmail": "email",
	};
	
	const sampleTutor = {
		"id": 1,
		"firstName": "Chris",
		"lastName": "Gaucho",
		"email": "cgaucho@ucsb.edu",
	};

	const sampleTutorAssignment={
		"id": 1,
		"course": sampleCourse,
		"tutor": sampleTutor,
		"assignmentType": "TA",
	}

	const sampleOnlineOfficeHours={
		"id": 1,
		"tutorAssignment": sampleTutorAssignment,
		"dayOfWeek": "Tuesday",
		"startTime": "4:00 PM",
		"endTime": "6:00 PM",
		"zoomRoomLink": "zoomLink",
		"notes":"Scott closes the room early sometimes but he will still be on slack!",
	}

	const sampleTutorAssignmentOfficeHourView={
		"tutorAssignment": sampleTutorAssignment,
		"onlineOfficeHours": sampleOnlineOfficeHours,
	}

	test("empty component renders without crashing", () => {
		render(<CourseDetail />);
	});

	test("component with existing course renders without crashing", () => {
		render(<CourseDetail existingView={sampleTutorAssignmentOfficeHourView} member = {true}/>);
	});

	test("component with existing course renders without crashing", () => {
		render(<CourseDetail existingView={sampleTutorAssignmentOfficeHourView} member={false} />);
	});


});
