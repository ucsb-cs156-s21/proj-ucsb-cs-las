import React from "react";
import { waitFor, render, screen, fireEvent } from "@testing-library/react";
import useSWR from "swr";
import { useAuth0 } from "@auth0/auth0-react";
import Tutor from "main/pages/Tutor/Tutor";
import userEvent from "@testing-library/user-event";
import { buildDeleteTutor } from "main/services/Tutor/TutorService";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { fetchWithToken } from "main/utils/fetch";
import { uploadTutorsCSV } from "../../../main/services/Tutor/TutorService";

jest.mock("swr");
jest.mock("@auth0/auth0-react");
jest.mock("main/utils/fetch", () => ({
  fetchWithToken: jest.fn()
}));
jest.mock("main/services/Tutor/TutorService", () => ({
  buildCreateTutor: jest.fn(),
  buildDeleteTutor: jest.fn(),
  buildUpdateTutor: jest.fn(),
  uploadTutorsCSV: jest.fn()
}));
jest.mock("react-router-dom", () => ({
  useHistory: jest.fn()
}));
jest.mock("react-toast-notifications", () => ({
  useToasts: jest.fn()
}));


describe("Tutor page test", () => {
  const tutors = [
    {
      id: 1,
      firstName: "Phill",
      lastName: "Conrad",
      email: "phtcon@ucsb.edu"
    },
    {
      id: 2,
      firstName: "Chandra",
      lastName: "Krintz",
      email: "krintz@example.org"
    }
  ];
  const user = {
    name: "test user"
  };

  const getAccessTokenSilentlySpy = jest.fn();
  const mutateSpy = jest.fn();
  const addToast = jest.fn();

  beforeEach(() => {
    useAuth0.mockReturnValue({
      admin: undefined,
      getAccessTokenSilently: getAccessTokenSilentlySpy,
      user: user
    });
    useToasts.mockReturnValue({
      addToast: addToast
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    useSWR.mockReturnValueOnce({
      data: { role: "admin" },
      error: undefined,
      mutate: mutateSpy
    });
    useSWR.mockReturnValue({
      data: tutors,
      error: undefined,
      mutate: mutateSpy
    });
    render(<Tutor />);
  });

  test("renders loading while tutor list is undefined", () => {
    useSWR.mockReturnValueOnce({
      data: { role: "admin" },
      error: undefined,
      mutate: mutateSpy
    });
    useSWR.mockReturnValue({
      data: tutors,
      error: undefined,
      mutate: mutateSpy
    });
    useSWR.mockReturnValue({
      data: undefined,
      error: undefined,
      mutate: mutateSpy
    });
    const { getByAltText } = render(<Tutor />);
    const loading = getByAltText("Loading");
    expect(loading).toBeInTheDocument();
  });

  test("can render sort name column by descending", () => {
    useSWR.mockReturnValueOnce({
      data: { role: "admin" },
      error: undefined,
      mutate: mutateSpy
    });
    useSWR.mockReturnValueOnce({
      data: tutors,
      error: undefined,
      mutate: mutateSpy
    });
    useSWR.mockReturnValue({
      data: [],
      error: undefined,
      mutate: mutateSpy
    });

    const { getByText } = render(<Tutor />);
    const tutorHeader = getByText("First Name");
    userEvent.click(tutorHeader);
    
    const descendingON = String.fromCharCode(0x25bc);
    expect(getByText(descendingON)).toBeInTheDocument();
  });

  test("can render sort name column by ascending", () => {
    useSWR.mockReturnValueOnce({
      data: { role: "admin" },
      error: undefined,
      mutate: mutateSpy
    });
    useSWR.mockReturnValueOnce({
      data: tutors,
      error: undefined,
      mutate: mutateSpy
    });
    useSWR.mockReturnValue({
      data: [],
      error: undefined,
      mutate: mutateSpy
    });

    const { getByText } = render(<Tutor />);
    const tutorHeader = getByText("First Name");
    userEvent.click(tutorHeader);
    userEvent.click(tutorHeader);
    
    const ascendingON = String.fromCharCode(0x25b2);
    expect(getByText(ascendingON)).toBeInTheDocument();
  });

  test("renders without crashing when a member and not an instructor", () => {
    useSWR.mockReturnValueOnce({
      data: { role: "member" },
      error: undefined,
      mutate: mutateSpy
    });
    useSWR.mockReturnValueOnce({
      data: tutors,
      error: undefined,
      mutate: mutateSpy
    });
    useSWR.mockReturnValue({
      data: [],
      error: undefined,
      mutate: mutateSpy
    });
    render(<Tutor />);
  });

  test("renders an error message when there is an error", () => {
    useSWR.mockReturnValueOnce({
      data: { role: "admin" },
      error: undefined,
      mutate: mutateSpy
    });
    useSWR.mockReturnValue({
      data: tutors,
      error: undefined,
      mutate: mutateSpy
    });
    useSWR.mockReturnValue({
      data: undefined,
      error: new Error("this is an error"),
      mutate: mutateSpy
    });
    const { getByText } = render(<Tutor />);
    const error = getByText(/error/);
    expect(error).toBeInTheDocument();
  });

  test("can delete a tutor", async () => {
    useSWR.mockReturnValueOnce({
      data: { role: "admin" },
      error: undefined,
      mutate: mutateSpy
    });
    useSWR.mockReturnValue({
      data: tutors,
      error: undefined,
      mutate: mutateSpy
    });
    const fakeDeleteFunction = jest.fn();
    buildDeleteTutor.mockReturnValue(fakeDeleteFunction);
    const { getAllByTestId } = render(<Tutor />);
    const deleteButtons = getAllByTestId("delete-button-1");
    userEvent.click(deleteButtons[0]);
    await waitFor(() => expect(fakeDeleteFunction).toHaveBeenCalledTimes(1));
  });

  test("can edit a tutor", async () => {
    useSWR.mockReturnValueOnce({
      data: { role: "admin" },
      error: undefined,
      mutate: mutateSpy
    });
    useSWR.mockReturnValue({
      data: tutors,
      error: undefined,
      mutate: mutateSpy
    });
    const pushSpy = jest.fn();
    useHistory.mockReturnValue({
      push: pushSpy
    });

    const { getAllByTestId } = render(<Tutor />);
    const editButtons = getAllByTestId("edit-button-2");
    userEvent.click(editButtons[0]);

    await waitFor(() => expect(pushSpy).toHaveBeenCalledTimes(1));
  });

  test("can create a new tutor", async () => {
    useSWR.mockReturnValueOnce({
      data: { role: "admin" },
      error: undefined,
      mutate: mutateSpy
    });
    useSWR.mockReturnValue({
      data: tutors,
      error: undefined,
      mutate: mutateSpy
    });
    const pushSpy = jest.fn();
    useHistory.mockReturnValue({
      push: pushSpy
    });

    const { getAllByTestId } = render(<Tutor />);
    const newButtons = getAllByTestId("new-tutor-button");
    userEvent.click(newButtons[0]);

    await waitFor(() => expect(pushSpy).toHaveBeenCalledTimes(1));
  });

  test("check if tutor csv is visible if admin", async () => {
    const mockUploadFunc = jest.fn(async (file) => {
      const data = new FormData(); 
      data.append("csv", file); 
      try {
        await fetchWithToken('/api/member/tutors/upload', getToken, {
          method: "POST", 
          body: data
        });
      onSuccess(); 
      } catch (err) {
        onError(err); 
      }
    });
    uploadTutorsCSV.mockReturnValue(mockUploadFunc); 
    useSWR.mockReturnValueOnce({
      data: { role: "admin" },
      error: undefined,
      mutate: mutateSpy
    });
    useSWR.mockReturnValue({
      data: tutors,
      error: undefined,
      mutate: mutateSpy
    });
    const pushUpload = jest.fn();
    useHistory.mockReturnValue({
      push: pushUpload
    });
    const { getByText } = render(<Tutor />);
    const csvButton = getByText("Upload");
    userEvent.click(csvButton);
    await waitFor(() => expect(pushUpload).toHaveBeenCalledTimes(0));
  });

  test("error if user not an admin or instructor and CSV file upload is not visible", () => {
    useSWR.mockReturnValue({
      data: { role: "member" },
      error: undefined,
      mutate: mutateSpy
    });
    useSWR.mockReturnValue({
      data: tutors,
      error: undefined,
      mutate: mutateSpy
    });
    
    render(<Tutor />);
    const csvButton = screen.queryByText("Upload");
    expect(csvButton).toBeNull();
  });

  test("check if the file is uploaded successfully", async () => {
    useSWR.mockReturnValueOnce({
      data: { role: "admin" },
      error: undefined,
      mutate: mutateSpy
    });
    useSWR.mockReturnValue({
      data: tutors,
      error: undefined,
      mutate: mutateSpy
    });

    const csvFile = new File(['foo'], 'sample.csv', { type: 'file/csv' });

    const { getByTestId } = render(<Tutor />);
    const csvHolder = getByTestId("csv-input");
    await waitFor(() =>
      fireEvent.change(csvHolder, {
        target: { files: [csvFile] },
      })
    );

    const csvF = document.getElementById("custom-file-input");
    expect(csvF.files[0].name).toBe('sample.csv');
    expect(csvF.files.length).toBe(1);
  });

  test.skip("clicking upload button adds a toast on error", async () => {
    useSWR.mockReturnValueOnce({
      data: { role: "admin" },
      error: undefined,
      mutate: mutateSpy
    });
    useSWR.mockReturnValue({
      data: tutors,
      error: undefined,
      mutate: mutateSpy
    });
    fetchWithToken.mockImplementation(() => {
      return {};
    });
    const { getByText } = render(<Tutor />);
    const csvButton = getByText("Upload");
    userEvent.click(csvButton);
    await waitFor(() => expect(addToast).toHaveBeenCalledTimes(1));
    expect(addToast).toHaveBeenCalledWith("Error Uploading CSV", { appearance: 'error' });
  });

  // test("can click to add a tutor", async () => {
  //   // const fakeDeleteFunction = jest.fn(async () => {
  //   //   try {
  //   //     await fetchWithToken(`/api/member/tutors/${id}`, getToken, {
  //   //       method: "DELETE",
  //   //       headers: {
  //   //         "content-type": "application/json"
  //   //       },
  //   //       noJSON: true
  //   //     });
  //   //     onSuccess();
  //   //   } catch (err) {
  //   //     addToast();
  //   //   }
  //   // });
  //   // buildDeleteTutor.mockReturnValue(fakeDeleteFunction);

  //   fetchWithToken.mockImplementation(async () => {
  //     throw new Error();
  //   });

  //   const pushSpy = jest.fn();
  //   useHistory.mockReturnValue({
  //     push: pushSpy
  //   });

  //   const { getAllByTestId } = render(<Tutor />);

  //   const deleteButton = getAllByTestId("delete-button-1");
  //   expect(deleteButton[0]).toBeInTheDocument();
  //   userEvent.click(deleteButton[0]);

  //   //await waitFor(() => expect(addToast).toHaveBeenCalledTimes(1));
  //   expect(addToast).toHaveBeenCalledWith("Error deleting tutor", {
  //     appearance: "error"
  //   });
  // });
});
