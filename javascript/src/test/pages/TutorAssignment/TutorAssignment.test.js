import React from "react";
import { waitFor, render, screen, fireEvent } from "@testing-library/react";
import useSWR from "swr";
import { fetchWithToken } from "main/utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";
import TutorAssignment from "main/pages/TutorAssignment/TutorAssignments";
import userEvent from "@testing-library/user-event";
import { useHistory } from "react-router-dom";
import { uploadTutorAssignmentCSV } from "../../../main/services/TutorAssignment/TutorAssignmentService";
import { useToasts } from "react-toast-notifications";

jest.mock("swr");
jest.mock("@auth0/auth0-react");
const getAccessTokenSilentlySpy = jest.fn();
const mutateSpy = jest.fn();
const getToken = jest.fn();

jest.mock("react-toast-notifications", () => ({
  useToasts: jest.fn(),
}));

jest.mock("main/services/TutorAssignment/TutorAssignmentService", () => ({
  buildCreateTutorAssignment: jest.fn(),
  buildUpdateTutorAssignment: jest.fn(),
  uploadTutorAssignmentCSV: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(),
}));

describe("TutorAssignment page test", () => {
  const tutorAssignments = [
    {
      id: 1,
      course: {
        name: "CMPSC 156",
        id: 1,
        quarter: "20202",
        instructorFirstName: "Phill",
        instructorLastName: "Conrad",
        instructorEmail: "phtcon@ucsb.edu",
      },
      tutor: {
        email: "scottpchow@ucsb.edu",
        firstName: "Scott",
        id: 1,
        lastName: "Chow",
      },
      assignmentType: "TA",
    },
    {
      id: 2,
      course: {
        name: "CMPSC 148",
        id: 2,
        quarter: "20204",
        instructorFirstName: "Jack",
        instructorLastName: "Smith",
        instructorEmail: "js@ucsb.edu",
      },
      tutor: {
        email: "alu@ucsb.edu",
        firstName: "Andrew",
        id: 2,
        lastName: "LU",
      },
      assignmentType: "LA",
    },
  ];
  const user = {
    name: "test user",
  };

  beforeEach(() => {
    useAuth0.mockReturnValue({
      admin: undefined,
      getAccessTokenSilently: getAccessTokenSilentlySpy,
      user: user,
    });
    useSWR.mockReturnValueOnce({
      data: { role: "admin" },
      error: undefined,
      mutate: mutateSpy,
    });
    useToasts.mockReturnValue({
      addToast: jest.fn(),
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
      data: { role: "admin" },
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
      push: pushSpy,
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
      data: { role: "admin" },
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
      push: pushSpy,
    });

    const { getByText } = render(<TutorAssignment />);
    const newTutorAssignmentButton = getByText("New Tutor Assignment");
    userEvent.click(newTutorAssignmentButton);

    await waitFor(() => expect(pushSpy).toHaveBeenCalledTimes(1));
  });

  test("can click to add a tutor assignment if instructor", async () => {
    useSWR.mockReturnValueOnce({
      data: [{}, {}],
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
      push: pushSpy,
    });

    const { getByText } = render(<TutorAssignment />);
    const newTutorAssignmentButton = getByText("New Tutor Assignment");
    userEvent.click(newTutorAssignmentButton);

    await waitFor(() => expect(pushSpy).toHaveBeenCalledTimes(1));
  });


  test("check if the file is uploaded successfully", async () => {
    useSWR.mockReturnValueOnce({
      data: { role: "admin" },
      error: undefined,
      mutate: mutateSpy,
    });
    useSWR.mockReturnValue({
      data: tutorAssignments,
      error: undefined,
      mutate: mutateSpy,
    });

    const csvFile = new File(["foo"], "sample.csv", { type: "file/csv" });

    const { getByTestId } = render(<TutorAssignment />);
    const csvHolder = getByTestId("csv-input");
    await waitFor(() =>
      fireEvent.change(csvHolder, {
        target: { files: [csvFile] },
      })
    );
    const csvF = document.getElementById("custom-file-input");
    expect(csvF.files[0].name).toBe("sample.csv");
    expect(csvF.files.length).toBe(1);
  });

  test.skip("clicking upload button adds a toast on error", async () => {
    useSWR.mockReturnValueOnce({
      data: { role: "admin" },
      error: undefined,
      mutate: mutateSpy,
    });
    useSWR.mockReturnValue({
      data: tutorAssignments,
      error: undefined,
      mutate: mutateSpy,
    });
    fetchWithToken.mockImplementation(() => {
      return {};
    });
    const { getByText } = render(<TutorAssignment />);
    const csvButton = getByText("Upload");
    userEvent.click(csvButton);
    await waitFor(() => expect(addToast).toHaveBeenCalledTimes(1));
    expect(addToast).toHaveBeenCalledWith("Error Uploading CSV", {
      appearance: "error",
    });
  });
});
