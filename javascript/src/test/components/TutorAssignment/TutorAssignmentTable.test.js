import React from "react";
import useSWR from "swr";
jest.mock("swr");
import { waitFor, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TutorAssignmentTable from "main/components/TutorAssignment/TutorAssignmentTable";
import { useHistory } from "react-router-dom";
jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(),
}));


describe("CourseForm tests", () => {
    const tutorAssignments = [
        {
          id: 1,
          course:  {name: "CMPSC 156",
                    id: 1,
                    quarter: "20202",
                    instructorFirstName: "Phill",
                    instructorLastName: "Conrad",
                    instructorEmail: "phtcon@ucsb.edu",
                    },
          tutor:   {email: "scottpchow@ucsb.edu",
                    firstName: "Scott",
                    id: 1,
                    lastName: "Chow"},
          assignmentType: "TA",
        }
      ];

  test("renders without crashing", () => {
    render(<TutorAssignmentTable tutorAssignments={tutorAssignments} instructor={false}/>);
  });

  
});