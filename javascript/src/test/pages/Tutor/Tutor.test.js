import React from "react";
import { waitFor, render } from "@testing-library/react";
import useSWR from "swr";
jest.mock("swr");
import { useAuth0 } from "@auth0/auth0-react";
jest.mock("@auth0/auth0-react");
import Tutor from "main/pages/Tutor/Tutor";
import userEvent from "@testing-library/user-event";
import { fetchWithToken } from "main/utils/fetch";
jest.mock("main/utils/fetch");
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
import { useToasts } from 'react-toast-notifications'
jest.mock('react-toast-notifications', () => ({
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

  const roleInfo = {
    role: "admin"
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

    // useSWR.mockReturnValueOnce({
    //   data: tutors,
    //   error: undefined,
    //   mutate: mutateSpy
    // });

    // useSWR.mockReturnValueOnce({
    //   data: tutors,
    //   error: undefined,
    //   mutate: mutateSpy
    // });

    useToasts.mockReturnValue({
      addToast: addToast
    })
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    render(

        <Tutor />

    );
  });

  test("renders loading while tutor list is undefined", () => {
    useSWR.mockReturnValue({
      data: undefined,
      error: undefined,
      mutate: mutateSpy
    });
    const { getByAltText } = render(

        <Tutor />

    );
    const loading = getByAltText("Loading");
    expect(loading).toBeInTheDocument();
  });

  test("renders an error message when there is an error", () => {
    useSWR.mockReturnValue({
      data: undefined,
      error: new Error("this is an error"),
      mutate: mutateSpy
    });
    const { getByText } = render(
        <Tutor />
    );
    const error = getByText(/error/);
    expect(error).toBeInTheDocument();
  });

  test("can delete a tutor", async () => {
    const fakeDeleteFunction = jest.fn();
    buildDeleteTutor.mockReturnValue(fakeDeleteFunction);
    const { getAllByTestId } = render(

        <Tutor />

    );
    const deleteButtons = getAllByTestId("delete-button-1");
    userEvent.click(deleteButtons[0]);
    await waitFor(() => expect(fakeDeleteFunction).toHaveBeenCalledTimes(1));
  });

  test("can edit a tutor", async () => {
    const pushSpy = jest.fn();
    useHistory.mockReturnValue({
      push: pushSpy
    });

    const { getAllByTestId } = render(

        <Tutor />

    );
    const editButtons = getAllByTestId("edit-button-2");
    userEvent.click(editButtons[0]);

    await waitFor(() => expect(pushSpy).toHaveBeenCalledTimes(1));
  });

  test("can click to add a tutor", async () => {
    const pushSpy = jest.fn();
    useHistory.mockReturnValue({
      push: pushSpy
    });

    const { getByText } = render(

        <Tutor />

    );
    const newTutorButton = getByText("New Tutor");
    userEvent.click(newTutorButton);

    await waitFor(() => expect(pushSpy).toHaveBeenCalledTimes(1));
  });

  // test("delete a tutor with error", async () => {
    
  //   // fetchWithToken.mockImplementation(() => {
  //   //   throw new Error();
  //   // });

  //   buildDeleteTutor.mockReturnValue(() => {
  //     throw new Error();
  //   });

  //   const pushSpy = jest.fn();
  //   useHistory.mockReturnValue({
  //     push: pushSpy
  //   });

  //   const { getAllByTestId } = render(    

  //       <Tutor />

  //   );

  //   const deleteButtons = getAllByTestId("delete-button-1");
  //   userEvent.click(deleteButtons[0]);

  //   expect(addToast).toHaveBeenCalledTimes(1);
  //   expect(addToast).toHaveBeenCalledWith("Error deleting tutor", { appearance: 'error' });
  // });

});

// fetchWithToken.mockImplementation(() => {
//   throw new Error();
// });

// const pushSpy = jest.fn();
// useHistory.mockReturnValue({
//   push: pushSpy
// });

// const { getByText } = render(
//   <NewTutor />
// );

// const submitButton = getByText("Submit");
// expect(submitButton).toBeInTheDocument();
// userEvent.click(submitButton);

// expect(addToast).toHaveBeenCalledTimes(1);
// expect(addToast).toHaveBeenCalledWith("Error saving tutor", { appearance: 'error' });