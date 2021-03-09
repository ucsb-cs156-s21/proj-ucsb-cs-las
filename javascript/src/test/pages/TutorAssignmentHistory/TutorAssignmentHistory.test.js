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
    },{
      email: "",
      firstName: "Tutor",
      id: 1,
      lastName: "Tutor2",
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

  const coursesByTutorEmpty = [];

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



  test("select a tutor with assignments", async () => {

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

    await selectOption(getByTestId('ta-select'), 'Tutor Tutor1');

  });


  test("select a tutor without assignments", async () => {

    const keyDownEvent = {
    key: 'ArrowDown',
  };

   async function selectOption(container, optionText) {
    const placeholder = getByText(container, 'Select...');
    fireEvent.keyDown(placeholder, keyDownEvent);
    await findByText(container, optionText);
    fireEvent.click(getByText(container, optionText));
  }


    fetchWithToken.mockReturnValue(coursesByTutorEmpty);
    var { getByTestId } = render(<TutorAssignmentHistory />);

    await selectOption(getByTestId('ta-select'), 'Tutor Tutor1');

  });

    test("select a tutor without email", async () => {

    const keyDownEvent = {
    key: 'ArrowDown',
  };

   async function selectOption(container, optionText) {
    const placeholder = getByText(container, 'Select...');
    fireEvent.keyDown(placeholder, keyDownEvent);
    await findByText(container, optionText);
    fireEvent.click(getByText(container, optionText));
  }


    fetchWithToken.mockReturnValue(coursesByTutorEmpty);
    var { getByTestId } = render(<TutorAssignmentHistory />);

    await selectOption(getByTestId('ta-select'), 'Tutor Tutor2');

  });



});


