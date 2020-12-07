import React from "react";
import { render, waitFor } from "@testing-library/react";
import TutorForm from "main/components/Tutor/TutorForm";
import userEvent from "@testing-library/user-event";

describe("TutorForm tests", () => {

  const sampleTutor = {
    "id": 1,
    "instructorFirstName": "Phill",
    "instructorLastName": "Conrad",
    "instructorEmail": "phtcon@ucsb.edu"
  }

  test("empty component renders without crashing", () => {
    render(<TutorForm />);
  });

  test("component with existing course renders without crashing", () => {
    render(<TutorForm existingTutor={sampleTutor}/>);
  });

  test("updating tutor name works", async () => {

    const updateTutorMock = jest.fn();

    const { getByText, getByDisplayValue } = render
      (<TutorForm updateTutor={updateTutorMock} existingTutor={sampleTutor}/>)
    ;

    const updatedTutor = {
      ...sampleTutor,
      name: "updated name",
    };

    const input = getByDisplayValue(sampleTutor.name);
    userEvent.clear(input);
    userEvent.type(input, updatedTutor.name);

    const submitButton = getByText("Submit");
    userEvent.click(submitButton);

    expect(updateTutorMock).toHaveBeenCalledTimes(1);
    expect(updateTutorMock).toHaveBeenCalledWith(updatedTutor, updatedTutor.id);

  });

  test("creating tutor works", async () => {

    const createTutorMock = jest.fn();

    const { getByLabelText, getByText } = render
      (<TutorForm createTutor={createTutorMock} />)
    ;

    const nameInput = getByLabelText("Tutor Name");
    userEvent.type(nameInput, sampleTutor.name);

    const fnameInput = getByLabelText("First Name");
    userEvent.type(fnameInput, sampleTutor.instructorFirstName);

    const lnameInput = getByLabelText("Last Name");
    userEvent.type(lnameInput, sampleTutor.instructorLastName);

    const emailInput = getByLabelText("Email");
    userEvent.type(emailInput, sampleTutor.instructorEmail);

    const submitButton = getByText("Submit");
    userEvent.click(submitButton);

    expect(createTutorMock).toHaveBeenCalledTimes(1);
    expect(createTutorMock).toHaveBeenCalledWith({ ... sampleTutor, id: undefined });
  });
});
