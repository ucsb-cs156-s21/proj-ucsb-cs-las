import React from "react";
import { render } from "@testing-library/react";
import TutorForm from "main/components/Tutor/TutorForm";
import userEvent from "@testing-library/user-event";

describe("TutorForm tests", () => {

  const sampleTutor = {
    "firstName": "Phill",
    "lastName": "Conrad",
    "email": "phtcon@ucsb.edu"
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
      firstName: "updated name",
    };

    const input = getByDisplayValue(sampleTutor.firstName);
    userEvent.clear(input);
    userEvent.type(input, updatedTutor.firstName);

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

    const fnameInput = getByLabelText("First Name");
    userEvent.type(fnameInput, sampleTutor.firstName);

    const lnameInput = getByLabelText("Last Name");
    userEvent.type(lnameInput, sampleTutor.lastName);

    const emailInput = getByLabelText("Email");
    userEvent.type(emailInput, sampleTutor.email);

    const submitButton = getByText("Submit");
    userEvent.click(submitButton);

    expect(createTutorMock).toHaveBeenCalledTimes(1);
    expect(createTutorMock).toHaveBeenCalledWith({ ...sampleTutor, id: '' });
  });
});
