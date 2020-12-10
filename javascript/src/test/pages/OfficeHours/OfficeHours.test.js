import React from "react";
import { waitFor, render } from "@testing-library/react";
import useSWR from "swr";
jest.mock("swr");
import { useAuth0 } from "@auth0/auth0-react";
jest.mock("@auth0/auth0-react");
import OfficeHours from "main/pages/OfficeHours/OfficeHours";
import userEvent from "@testing-library/user-event";
import { fetchWithToken } from "main/utils/fetch";
jest.mock("main/utils/fetch");
import { buildDeleteOfficeHour, buildCreateOfficeHour } from "main/services/OfficeHours/OfficeHourService";






jest.mock("main/services/OfficeHours/OfficeHourService", () => ({
  buildDeleteOfficeHour: jest.fn(),
}) );

import { useHistory } from "react-router-dom";
jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(),
}));

describe("OfficeHours page test", () => {
  const officeHourList = [
    {
      id: 1,
      startTime: "12:30",
      endTime: "2:30",
      dayOfWeek: "Monday",
      zoomRoomLink: "link.com",
      notes: "testNotes"
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
    useSWR.mockReturnValue({
      data: officeHourList,
      error: undefined,
      mutate: mutateSpy,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    render(<OfficeHours />);
  });

  test("renders loading while office hour list is undefined", () => {
    useSWR.mockReturnValue({
      data: undefined,
      error: undefined,
      mutate: mutateSpy,
    });
    const { getByAltText } = render(<OfficeHours />);
    const loading = getByAltText("Loading");
    expect(loading).toBeInTheDocument();
  });

  test("renders an error message when there is an error", () => {
    useSWR.mockReturnValue({
      data: undefined,
      error: new Error("this is an error"),
      mutate: mutateSpy,
    });
    const { getByText } = render(<OfficeHours />);
    const error = getByText(/error/);
    expect(error).toBeInTheDocument();
  });


  test("can delete an office hour", async () => {
    const fakeDeleteFunction = jest.fn();
    buildDeleteOfficeHour.mockReturnValue(fakeDeleteFunction);
    const { getAllByTestId } = render(<OfficeHours />);
    const deleteButtons = getAllByTestId("delete-button");
    userEvent.click(deleteButtons[0]);
    await waitFor(() => expect(fakeDeleteFunction).toHaveBeenCalledTimes(1));
  });

  test("can click to add an office hour", async () => {

    const pushSpy = jest.fn();
    useHistory.mockReturnValue({
      push: pushSpy
    });

    const { getByText } = render(<OfficeHours />);
    const newOfficeHourButton = getByText("New Office Hour");
    userEvent.click(newCourseButton);

    await waitFor(() => expect(pushSpy).toHaveBeenCalledTimes(1));
  });



});
