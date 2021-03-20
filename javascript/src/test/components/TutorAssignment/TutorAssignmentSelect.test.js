import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TutorAssignmentSelect from "main/components/TutorAssignment/TutorAssignmentSelect";

describe("TutorAssignmentSelect", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders a usable tutor assignment UI", async () => {
    const onChange = jest.fn();
    const quarterProvider = jest.fn().mockResolvedValue(["20201"]);
    const courseProvider = jest.fn().mockResolvedValue([{ id: 1, name: "CMPSC 156" }]);
    const tutorAssignmentProvider = jest.fn().mockResolvedValue([{ id: 2, tutor: { firstName: "Foo", lastName: "Bar" }}]);
    const { _debug, getByPlaceholderText, getByText } = render(
      <TutorAssignmentSelect
        onChange={onChange}
        quarterProvider={quarterProvider}
        courseProvider={courseProvider}
        tutorAssignmentProvider={tutorAssignmentProvider}
      />
    );

    await waitFor(() => expect(quarterProvider).toHaveBeenCalledTimes(1));

    userEvent.click(getByPlaceholderText("Select a tutor"));
    userEvent.click(getByText("Winter 2020"));

    await waitFor(() => expect(courseProvider).toHaveBeenCalledWith("20201"));

    userEvent.click(getByText("CMPSC 156"));

    await waitFor(() => expect(tutorAssignmentProvider).toHaveBeenCalledWith(1));

    userEvent.click(getByText("Foo Bar"));

    expect(onChange).toHaveBeenCalledWith(2);
  });
});


