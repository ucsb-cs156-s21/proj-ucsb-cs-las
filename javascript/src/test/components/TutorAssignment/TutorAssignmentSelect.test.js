import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TutorAssignmentSelect from "main/components/TutorAssignment/TutorAssignmentSelect";

import { quarterProvider, courseProvider, tutorAssignmentProvider } from "main/services/selectorSupport"
jest.mock("main/services/selectorSupport");


describe("TutorAssignmentSelect", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders a usable tutor assignment UI", async () => {
    const onChange = jest.fn();
    quarterProvider.mockResolvedValue(["20201"]);
    courseProvider.mockResolvedValue([{ id: 17, name: "CMPSC 156" }]);
    tutorAssignmentProvider.mockResolvedValue([{ id: 42, tutor: { firstName: "Foo", lastName: "Bar" }}]);
    const { getByPlaceholderText, getByText } = render(
      <TutorAssignmentSelect
        onChange={onChange}
      />
    );

    await waitFor(() => expect(quarterProvider).toHaveBeenCalledTimes(1));

    userEvent.click(getByPlaceholderText("Select a tutor"));
    userEvent.click(getByText("Winter 2020"));

    await waitFor(() => expect(courseProvider).toHaveBeenCalledWith("20201"));

    userEvent.click(getByText("CMPSC 156"));

    await waitFor(() => expect(tutorAssignmentProvider).toHaveBeenCalledWith(17));

    userEvent.click(getByText("Foo Bar"));

    expect(onChange).toHaveBeenCalledWith(42);
  });
});

