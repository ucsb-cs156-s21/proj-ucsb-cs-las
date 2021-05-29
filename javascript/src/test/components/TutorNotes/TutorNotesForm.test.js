
import React from "react";
import { render } from "@testing-library/react";
import useSWR from "swr";
import TutorNotesForm from "main/components/TutorNotes/TutorNotesForm";
import userEvent from "@testing-library/user-event";
jest.mock("swr");

describe("TutorNotesForm tests", () => {
    const courses = [
        {
        name: "CMPSC 156",
        id: 1,
        quarter: "20202",
        instructorFirstName: "Phill",
        instructorLastName: "Conrad",
        instructorEmail: "phtcon@ucsb.edu",
        },
        {
        name: "CMPSC 148",
        id: 2,
        quarter: "20203",
        instructorFirstName: "Chandra",
        instructorLastName: "Krintz",
        instructorEmail: "krintz@example.org",
        },
    ];

    const sampleTutorNotes = {
          id: 1,
          course:  {name: "CMPSC 148",
                    id: 2,
                    quarter: "20203",
                    instructorFirstName: "Chandra",
                    instructorLastName: "Krintz",
                    instructorEmail: "krintz@example.org",
                    },
          tutor:    {email: "scottpchow@ucsb.edu",
                    firstName: "Scott",
                    id: 1,
                    lastName: "Chow"},
          message: "Random Message"
        };

    const _sampleTutorNotes2 = {
      id: 1,
      course:  {name: "CMPSC 148",
                id: 2,
                quarter: "20203",
                instructorFirstName: "Chandra",
                instructorLastName: "Krintz",
                instructorEmail: "krintz@example.org",
                },
        tutor:  {email: "scottpchow@ucsb.edu",
                firstName: "Scott",
                id: 1,
                lastName: "Chow"},
        message: "TA",
        index: 1
      };    

    const mutateSpy = jest.fn();
    beforeEach(() => {
        useSWR.mockReturnValue({
            data: courses,
            error: undefined,
            mutate: mutateSpy,
        });
    });

  test("empty component renders without crashing", () => {
    render(<TutorNotesForm />);
  });

  test("component with existing course renders without crashing", () => {
    render(<TutorNotesForm existingTutorNotes={sampleTutorNotes}/>);
  });

  test("error mesage appears if you are a member but not an admin or instructor", () => {
    useSWR.mockReturnValue({
        data: undefined,
        error: true,
        mutate: mutateSpy,
    });
    const { getByText } = render(<TutorNotesForm />);
    const errorMessage = getByText("You must be an instructor or an admin to create new Tutor Notes.");
    expect(errorMessage).toBeInTheDocument();
  });

  test("loading appears if course list is not returned yet", () => {
    useSWR.mockReturnValue({
        data: undefined,
        error: undefined,
        mutate: mutateSpy,
    });
    const { getByAltText } = render(<TutorNotesForm />);
    const loading = getByAltText("Loading");
    expect(loading).toBeInTheDocument();
  });

  test("creating TutorNotes works", async () => {

    const createTutorNotesMock = jest.fn();

    const { getByLabelText, getByText } = render
      (<TutorNotesForm createTutorNotes={createTutorNotesMock} />)
    ;

    const courseSelect = getByLabelText("Course Name");
    userEvent.selectOptions(courseSelect, "1");

    const submitButton = getByText("Submit");
    userEvent.click(submitButton);

    expect(createTutorNotesMock).toHaveBeenCalledTimes(1);
    expect(createTutorNotesMock).toHaveBeenCalledWith({ ...sampleTutorNotes, id: null, index: "1", tutor: null});
  });


});