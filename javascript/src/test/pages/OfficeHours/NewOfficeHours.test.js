import React from "react";
import { waitFor, render } from "@testing-library/react";
import useSWR from "swr";
jest.mock("swr");
import { useAuth0 } from "@auth0/auth0-react";
jest.mock("@auth0/auth0-react");
import NewOfficeHour from "main/pages/OfficeHours/NewOfficeHours";
import userEvent from "@testing-library/user-event";
import { useHistory } from 'react-router-dom';
import { buildCreateOfficeHour } from "main/services/OfficeHours/OfficeHourService";
jest.mock("main/services/OfficeHours/OfficeHourService");


jest.mock("react-router-dom", () => ({
  useHistory: jest.fn() // and this one too
}));

jest.mock("main/utils/fetch");


import { fetchWithToken } from "main/utils/fetch";
jest.mock("main/utils/fetch", () => ({
  fetchWithToken: jest.fn()
}));

import { useToasts } from 'react-toast-notifications'

jest.mock('react-toast-notifications', () => ({
  useToasts: jest.fn()
}));


describe("NewOfficeHours page test", () => {
  const pushSpy = jest.fn();
  const user = {
    name: "test user",
  };

  const getAccessTokenSilentlySpy = jest.fn();
  const officeHours =
  {

    id: 1,
    startTime: "test",
    endTime: "test",
    dayOfWeek: "test",
    zoomRoomLink: "test",
    notes: "test",
    tutorAssignmentid: 1,
  };

  const addToast = jest.fn();



  beforeEach(() => {
    useAuth0.mockReturnValue({
      admin: undefined,
      getAccessTokenSilently: getAccessTokenSilentlySpy,
      user: user
    });
    useToasts.mockReturnValue({
      addToast : addToast
    });
    useHistory.mockReturnValue({
      push: pushSpy
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    render(<NewOfficeHour />);
  });


  test("clicking submit button redirects to office hours page", async () => {





    buildCreateOfficeHour.mockImplementation((getToken, onSuccess, onError) => {
      return () => {
        onSuccess();
      }
    });

    const { getByText } = render(
      <NewOfficeHour />
    );

    const submitButton = getByText("Submit");
    expect(submitButton).toBeInTheDocument();
    userEvent.click(submitButton);

    await waitFor(() => expect(pushSpy).toHaveBeenCalledTimes(1));
    expect(pushSpy).toHaveBeenCalledWith("/officehours");

  });





/* THIS IS FOR WHEN WE ADD EDIT BUTTON
  test("can edit a course", async () => {

    const pushSpy = jest.fn();
    useHistory.mockReturnValue({
      push: pushSpy
    });

    const { getAllByTestId } = render(<OfficeHours />);
    const editButtons = getAllByTestId("edit-button");
    userEvent.click(editButtons[0]);

    await waitFor(() => expect(pushSpy).toHaveBeenCalledTimes(1));
  });

*/

  test("clicking submit button redirects to home page on error", async () => {

    fetchWithToken.mockImplementation(() => {
      throw new Error();
    });

    buildCreateOfficeHour.mockImplementation((getToken, onSuccess, onError) => {
      return () => {
        onError();
      }
    });

    const { getByText } = render(
      <NewOfficeHour />
    );

    const submitButton = getByText("Submit");
    expect(submitButton).toBeInTheDocument();
    userEvent.click(submitButton);

    expect(addToast).toHaveBeenCalledTimes(1);
    expect(addToast).toHaveBeenCalledWith("Error saving office hour", { appearance: 'error' });

  });



});
