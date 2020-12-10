import React from "react";
import { waitFor, render } from "@testing-library/react";
import useSWR from "swr";
jest.mock("swr");
import { useAuth0 } from "@auth0/auth0-react";
jest.mock("@auth0/auth0-react");
import Tutor from "main/pages/Tutor/Tutor";
import userEvent from "@testing-library/user-event";
import { fetchWithToken } from "main/utils/fetch";
jest.mock("main/utils/fetch", () => ({
  fetchWithToken: jest.fn()
}));
import {
  buildCreateTutor,
  buildDeleteTutor,
  buildUpdateTutor
} from "main/services/Tutor/TutorService";
jest.mock("main/services/Tutor/TutorService", () => ({
  buildCreateTutor: jest.fn(),
  buildDeleteTutor: jest.fn(),
  buildUpdateTutor: jest.fn()
}));
import { useHistory } from "react-router-dom";
jest.mock("react-router-dom", () => ({
  useHistory: jest.fn()
}));
import { useToasts } from "react-toast-notifications";
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
