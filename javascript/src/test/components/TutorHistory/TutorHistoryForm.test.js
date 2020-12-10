import React from "react";
import { getByText, render  } from "@testing-library/react";
import TutorHistoryForm from "main/components/TutorHistory/TutorHistoryForm";
import userEvent from "@testing-library/user-event";

describe("TutorHistoryForm tests", () => {

  const sampleTutorAssignment = {
    id: 1,
    course: {
      number: "CMPSC 148",
      id: 2,
      quarter: "20203",
      instructorFirstName: "Chandra",
      instructorLastName: "Krintz",
      instructorEmail: "krintz@example.org",
    },
    tutorEmail: "scottpchow@ucsb.edu",
    assignmentType: "TA"
  };

  const sampleCourseNumberList = ["CMPSC 148"];

  const sampleQuery = {
    value: sampleTutorAssignment.course.number,
  }

  test("empty component renders without crashing", () => {
    render(<TutorHistoryForm />);
  });

  test("searching for tutors by course works", async () => {

    const searchTutorHistoryByCourseMock = jest.fn();

    const { getByText } = render
      (<TutorHistoryForm searchTutorHistoryByCourse={searchTutorHistoryByCourseMock} courseNumbers={sampleCourseNumberList} />)
      ;

    const submitButton = getByText("CMPSC 148");
    userEvent.click(submitButton);

    expect(searchTutorHistoryByCourseMock).toHaveBeenCalledTimes(1);
    expect(searchTutorHistoryByCourseMock).toHaveBeenCalledWith(sampleQuery);

  });
});
