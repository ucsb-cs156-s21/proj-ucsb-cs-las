import React, { useState } from "react";
import { render } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import TutorAssignmentHistory from "main/pages/TutorAssignmentHistory/TutorAssignmentHistory.js";
import useSWR from "swr";

import { useToasts } from 'react-toast-notifications'
import { fetchWithToken } from "main/utils/fetch";

import userEvent from "@testing-library/user-event";
import { getByText, findByText, fireEvent } from '@testing-library/react';


jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn()
}));
jest.mock("@auth0/auth0-react");
jest.mock("swr");
jest.mock("react-router-dom", () => ({
  useHistory: jest.fn() // and this one too
}));
jest.mock("main/utils/fetch", () => ({
  fetchWithToken: jest.fn()
}));
jest.mock('react-toast-notifications', () => ({
  useToasts: jest.fn()
}));


describe("Tutor Assignment History page test", () => {
  const user = {
    name: "test user",
  };

  const tutorList = [
    {
      email: "tutor1@ucsb.edu",
      firstName: "Tutor",
      id: 1,
      lastName: "Tutor1",
    }
  ];

  const coursesByTutor = [
    {
      assignmentType: "LA",
      course: {
        id: 1,
        instructorEmail: "joegaucho@ucsb.edu",
        instructorFirstName: "Joe",
        instructorLastName: "Gaucho",
        name: "CS 1",
        quarter: "20204"
      },
      tutor: {
        email: "tutor1@ucsb.edu",
        firstName: "Tutor",
        id: 2,
        lastName: "Tutor1"

      }
    }
  ];


  const getAccessTokenSilentlySpy = jest.fn();
  const mutateSpy = jest.fn();
  const setStateSpy = jest.fn();

  test("renders loading while tutor assignment history is undefined", () => {
    useSWR.mockReturnValue({
      data: undefined,
      error: undefined,
      mutate: mutateSpy,
    });
    const { getByAltText } = render(<TutorAssignmentHistory />);
    const loading = getByAltText("Loading");
    expect(loading).toBeInTheDocument();
  });


  beforeEach(() => {
    useState.mockImplementation(init => [init, setStateSpy]);
    useAuth0.mockReturnValue({
      admin: undefined,
      getAccessTokenSilently: getAccessTokenSilentlySpy,
      user: user
    });
    jest.mock("main/utils/fetch", () => ({
      fetchWithToken: jest.fn()
    }));

    useSWR.mockImplementation((key, _getter) => {
      if (key[0] === "/api/member/tutors/") {
        return {
          data: tutorList
        };
      } else {
        return {
          data: tutorList,
          error: undefined,
          mutate: mutateSpy,
        }
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
/*
  beforeEach(() => {
    useState.mockImplementation(init => [init, setStateSpy]);
    useAuth0.mockReturnValue({
      admin: undefined,
      getAccessTokenSilently: getAccessTokenSilentlySpy,
      user: user
    });

    useSWR.mockImplementation((key, _getter) => {
      if (key[0] === "/api/member/tutorAssignment/byTutor/tutor@ucsb.edu") {
        return {
          data: coursesByTutor
        };
      } else {
        return {
          data: coursesByTutor,
          error: undefined,
          mutate: mutateSpy,
        }
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
*/

  test("renders without crashing", () => {
    render(<TutorAssignmentHistory />);
  });

/*  maybe add error message
test("renders an error message when there is an error", () => {
    useSWR.mockReturnValue({
      data: undefined,
      error: new Error("this is an error"),
      mutate: mutateSpy,
    });
    const { getByText } = render(<TutorAssignmentHistory />);
    const error = getByText(/error/);
    expect(error).toBeInTheDocument();
  });
*/



  test("select a tutor", async () => {

/*    jest.mock("react-select", () => ({ options, value, onChange }) => {
      function handleChange(event) {
        const option = options.find(
          option => option.value === event.currentTarget.value
          );
        onChange(option);
      }
      return(
        <select data-testid="select" value={value} onChange={handleChange}>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
          {label}
          </option>
          ))}
          </select>
          );
      });
    */

   /*  useSWR.mockReturnValue({
      data: coursesByTutor,
      error: undefined,
      mutate: mutateSpy,
    });*/

    const keyDownEvent = {
    key: 'ArrowDown',
  };

   async function selectOption(container, optionText) {
    const placeholder = getByText(container, 'Select...');
    fireEvent.keyDown(placeholder, keyDownEvent);
    await findByText(container, optionText);
    fireEvent.click(getByText(container, optionText));
  }


    fetchWithToken.mockReturnValue(coursesByTutor);
    var { getByTestId } = render(<TutorAssignmentHistory />);
    //const selectQuarter = getByTestId("select")
    //await userEvent.selectOptions("tutor1@ucsb.edu");
    await selectOption(getByTestId('ta-select'), 'Tutor Tutor1');
   // await findByText('CS 1');

   //  getByTestId = render(<TutorAssignmentHistory />);
 ///   const bootstrapTable = getByTestId('ta-table');
  //  expect(bootstrapTable).toBeInTheDocument();
  /*  const fakeDeleteFunction = jest.fn();
    buildDeleteCourse.mockReturnValue(fakeDeleteFunction);
    const { getAllByTestId } = render(<Courses />);
    const deleteButtons = getAllByTestId("delete-button");
    userEvent.click(deleteButtons[0]);
    await waitFor(() => expect(fakeDeleteFunction).toHaveBeenCalledTimes(1));*/
  });



});


