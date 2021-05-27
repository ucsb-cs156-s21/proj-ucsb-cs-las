import React from "react";
import { waitFor, render } from "@testing-library/react";
import useSWR from "swr";
import { useAuth0 } from "@auth0/auth0-react";
import Courses from "main/pages/Courses/Courses";
import userEvent from "@testing-library/user-event";
import { buildDeleteCourse } from "main/services/Courses/CourseService";
import { useHistory } from "react-router-dom";
jest.mock("swr");
jest.mock("@auth0/auth0-react");
jest.mock("main/utils/fetch");
jest.mock("main/services/Courses/CourseService", () => ({
  buildCreateCourse: jest.fn(),
  buildDeleteCourse: jest.fn(),
  buildUpdateCourse: jest.fn()
}));
jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(),
}));

describe("Courses page test", () => {
  const courses = [
    {
      name: "CMPSC 156",
      id: 1,
      quarter: "F20",
      instructorFirstName: "Phill",
      instructorLastName: "Conrad",
      instructorEmail: "phtcon@ucsb.edu",
    },
    {
      name: "CMPSC 148",
      id: 2,
      quarter: "F20",
      instructorFirstName: "Chandra",
      instructorLastName: "Krintz",
      instructorEmail: "krintz@example.org",
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

    useSWR.mockImplementation((key, _getter) => {
      if (key[0] === "/api/public/courses/") {
        return {
          data: courses
        };
      } else {
        return {
          data: courses,
          error: undefined,
          mutate: mutateSpy,
        }
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    render(<Courses />);
  });

  test("renders loading while course list is undefined", () => {
    useSWR.mockReturnValue({
      data: undefined,
      error: undefined,
      mutate: mutateSpy,
    });
    const { getByAltText } = render(<Courses />);
    const loading = getByAltText("Loading");
    expect(loading).toBeInTheDocument();
  });

  test("renders an error message when there is an error", () => {
    useSWR.mockReturnValue({
      data: undefined,
      error: new Error("this is an error"),
      mutate: mutateSpy,
    });
    const { getByText } = render(<Courses />);
    const error = getByText(/error/);
    expect(error).toBeInTheDocument();
  });

  test("can delete a course", async () => {
    const fakeDeleteFunction = jest.fn();
    buildDeleteCourse.mockReturnValue(fakeDeleteFunction);
    const { getAllByTestId } = render(<Courses />);
    const deleteButtons = getAllByTestId("delete-button");
    userEvent.click(deleteButtons[0]);
    await waitFor(() => expect(fakeDeleteFunction).toHaveBeenCalledTimes(1));
  });

  test("can edit a course", async () => {

    const pushSpy = jest.fn();
    useHistory.mockReturnValue({
      push: pushSpy
    });

    const { getAllByTestId } = render(<Courses />);
    const editButtons = getAllByTestId("edit-button");
    userEvent.click(editButtons[0]);

    await waitFor(() => expect(pushSpy).toHaveBeenCalledTimes(1));
  });

  test("can click to add a course", async () => {

    const pushSpy = jest.fn();
    useHistory.mockReturnValue({
      push: pushSpy
    });

    const { getByText } = render(<Courses />);
    const newCourseButton = getByText("New Course");
    userEvent.click(newCourseButton);

    await waitFor(() => expect(pushSpy).toHaveBeenCalledTimes(1));
  });
});