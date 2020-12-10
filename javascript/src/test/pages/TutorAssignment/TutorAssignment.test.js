import React from "react";
import { waitFor, render } from "@testing-library/react";
import useSWR from "swr";
jest.mock("swr");
import { useAuth0 } from "@auth0/auth0-react";
jest.mock("@auth0/auth0-react");
import TutorAssignment from "main/pages/TutorAssignment/TutorAssignment";
import userEvent from "@testing-library/user-event";
import { fetchWithToken } from "main/utils/fetch";
jest.mock("main/utils/fetch");
import { buildCreateTutorAssignment, buildDeleteTutorAssignment, buildUpdateTutorAssignment } from "main/services/TutorAssignment/TutorAssignmentService";
jest.mock("main/services/TutorAssignment/TutorAssignmentService", () => ({
  buildCreateTutorAssignment: jest.fn(),
  buildDeleteTutorAssignment: jest.fn(),
  buildUpdateTutorAssignment: jest.fn()
}) );
import { useHistory } from "react-router-dom";
jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(),
}));

describe("TutorAssignment page test", () => {
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
    },
    {
        id: 2,
        course:{name: "CMPSC 148",
                id: 2,
                quarter: "20204",
                instructorFirstName: "Jack",
                instructorLastName: "Smith",
                instructorEmail: "js@ucsb.edu",
                },
        tutor: {email: "alu@ucsb.edu",
                firstName: "Andrew",
                id: 2,
                lastName: "LU"},
        assignmentType: "LA",
    },
  ];
  const user = {
    name: "test user",
  };
  const getAccessTokenSilentlySpy = jest.fn();
  const mutateSpy = jest.fn();

  beforeEach(() => {
    useAuth0.mockReturnValue({
      admin: undefined,
      getAccessTokenSilently: getAccessTokenSilentlySpy,
      user: user
    });
    useSWR.mockReturnValueOnce({
      data: {role: "admin"},
      error: undefined,
      mutate: mutateSpy,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    useSWR.mockReturnValue({
        data: tutorAssignments,
        error: undefined,
        mutate: mutateSpy,
    });
    render(<TutorAssignment />);
  });

  test("renders loading while tutor assignment list is undefined", () => {
    useSWR.mockReturnValue({
      data: undefined,
      error: undefined,
      mutate: mutateSpy,
    });
    const { getByAltText } = render(<TutorAssignment />);
    const loading = getByAltText("Loading");
    expect(loading).toBeInTheDocument();
  });

  test("renders an error message when there is an error", async () => {
    useSWR.mockReturnValueOnce({
      data: {role: "admin"},
      error: undefined,
      mutate: mutateSpy,
    });
    useSWR.mockReturnValue({
      data: undefined,
      error: new Error("this is an error"),
      mutate: mutateSpy,
    });

    const pushSpy = jest.fn();
    useHistory.mockReturnValue({
      push: pushSpy
    });

    const { getByText } = render(<TutorAssignment />);
    const error = getByText(/error/);
    expect(error).toBeInTheDocument();

    const newTutorAssignmentButton = getByText("New Tutor Assignment");
    userEvent.click(newTutorAssignmentButton);

    await waitFor(() => expect(pushSpy).toHaveBeenCalledTimes(1));
  });

  test("can click to add a tutor assignment if admin", async () => {
    useSWR.mockReturnValueOnce({
        data: {role: "admin"},
        error: undefined,
        mutate: mutateSpy,
    });
    useSWR.mockReturnValueOnce({
        data: tutorAssignments,
        error: undefined,
        mutate: mutateSpy,
    });

    const pushSpy = jest.fn();
    useHistory.mockReturnValue({
      push: pushSpy
    });

    const { getByText } = render(<TutorAssignment />);
    const newTutorAssignmentButton = getByText("New Tutor Assignment");
    userEvent.click(newTutorAssignmentButton);

    await waitFor(() => expect(pushSpy).toHaveBeenCalledTimes(1));
  });

  test("can click to add a tutor assignment if instructor", async () => {
    useSWR.mockReturnValueOnce({
        data: [{},{}],
        error: undefined,
        mutate: mutateSpy,
    });
    useSWR.mockReturnValueOnce({
        data: tutorAssignments,
        error: undefined,
        mutate: mutateSpy,
    });

    const pushSpy = jest.fn();
    useHistory.mockReturnValue({
      push: pushSpy
    });

    const { getByText } = render(<TutorAssignment />);
    const newTutorAssignmentButton = getByText("New Tutor Assignment");
    userEvent.click(newTutorAssignmentButton);

    await waitFor(() => expect(pushSpy).toHaveBeenCalledTimes(1));
  });


});
