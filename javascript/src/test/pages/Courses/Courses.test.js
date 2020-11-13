import React from "react";
import { waitFor, render } from "@testing-library/react";
import useSWR from "swr";
jest.mock("swr");
import { useAuth0 } from "@auth0/auth0-react";
jest.mock("@auth0/auth0-react");
import CourseList from "main/pages/Courses/Courses";
import userEvent from "@testing-library/user-event";
import { fetchWithToken } from "main/utils/fetch";
jest.mock("main/utils/fetch");
describe("CourseList test", () => {
  const courses = [
    {
      name: "name",
      id: 1,
      quarter: "quarter",
      instructorFirstName: "instrfname",
      instructorLastName: "instrlname",
      instructorEmail: "instremail",
    },
    {
      name: "name2",
      id: 2,
      quarter: "quarter",
      instructorFirstName: "instrfname",
      instructorLastName: "instrlname",
      instructorEmail: "instremail",
    },
  ];
  const user = {
    name: "test user",
  };
  const getAccessTokenSilentlySpy = jest.fn();
  const mutateSpy = jest.fn();
  beforeEach(() => {
    useAuth0.mockReturnValue({
      admin,
      getAccessTokenSilently: getAccessTokenSilentlySpy,
    });
    useSWR.mockReturnValue({
      data: courses,
      error: undefined,
      mutate: mutateSpy,
    });
  });
  test("renders without crashing", () => {
    render(<CourseList />);
  });

  test("renders loading while course list is undefined", () => {
    useSWR.mockReturnValue({
      data: undefined,
      error: undefined,
      mutate: mutateSpy,
    });
    const { getByAltText } = render(<CourseList />);
    const loading = getByAltText("Loading");
    expect(loading).toBeInTheDocument();
  });

  test("renders an error message when there is an error", () => {
    useSWR.mockReturnValue({
      data: undefined,
      error: new Error("this is an error"),
      mutate: mutateSpy,
    });
    const { getByText } = render(<CourseList />);
    const error = getByText(/error/);
    expect(error).toBeInTheDocument();
  });

  test("can't submit blank course", () => {
    const { getByPlaceholderText, getByText } = render(<CourseList />);
    const name = getByPlaceholderText("add course");
    const input2 = getByPlaceholderText("quarter");
    const input3 = getByPlaceholderText("instructor first name");
    const input4 = getByPlaceholderText("instructor last name");
    const input5 = getByPlaceholderText("instructor email");
    const submit = getByText("Submit");
    userEvent.type(name, "");
    userEvent.type(input2, "");
    userEvent.type(input3, "");
    userEvent.type(input4, "");
    userEvent.type(input5, "");
    userEvent.click(submit);
    expect(mutateSpy).toHaveBeenCalledTimes(0);
  });

  test("can submit valid course", async () => {
    fetchWithToken.mockReturnValueOnce({
      id: 3,
      name: "new course",
      quarter: "quarter",
      instructorFirstName: "instrfname",
      instructorLastName: "instrlname",
      instructorEmail: "instremail",
    });

    const { getByPlaceholderText, getByText } = render(<CourseList />);
    const input = getByPlaceholderText("add course");
    const input2 = getByPlaceholderText("quarter");
    const input3 = getByPlaceholderText("instructor first name");
    const input4 = getByPlaceholderText("instructor last name");
    const input5 = getByPlaceholderText("instructor email");
    const submit = getByText("Submit");
    userEvent.type(input, "new course");
    userEvent.type(input2, "new quarter");
    userEvent.type(input3, "new fname");
    userEvent.type(input4, "new lname");
    userEvent.type(input5, "new email");
    userEvent.click(submit);
    await waitFor(() => expect(fetchWithToken).toHaveBeenCalledTimes(1));
    expect(mutateSpy).toHaveBeenCalledTimes(1);
  });

  test("can delete a course", async () => {
    const { getAllByText } = render(<CourseList />);
    const deleteButtons = getAllByText("Delete");
    userEvent.click(deleteButtons[0]);
    await waitFor(() => expect(fetchWithToken).toHaveBeenCalledTimes(1));
    expect(mutateSpy).toHaveBeenCalledTimes(1);
  });

  test("can edit a course", async () => {
    const { getAllByText, getByDisplayValue, getByText } = render(<CourseList />);
    const editButtons = getAllByText("Edit");
    userEvent.click(editButtons[0]);
    const selectedCourse = courses[0];
    const updatedCourse = {
      ...selectedCourse,
      name: "my new course",
      quarter: "quarter",
      instructorFirstName: "instrfname",
      instructorLastName: "instrlname",
      instructorEmail: "instremail",
    };
    const input = getByDisplayValue(selectedCourse.name);
    userEvent.clear(input);
    userEvent.type(input, updatedCourse.name);
    const doneButton = getByText("Done");
    userEvent.click(doneButton);
    await waitFor(() => expect(fetchWithToken).toHaveBeenCalledTimes(1));
    expect(mutateSpy).toHaveBeenCalledTimes(1);
    expect(fetchWithToken).toHaveBeenCalledWith(
      "/api/courses/1",
      getAccessTokenSilentlySpy,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedCourse),
      }
    );
    const editButtonsAfterEdit = getAllByText("Edit");
    expect(editButtons.length).toBe(editButtonsAfterEdit.length);
  });
});
