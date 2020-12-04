import React from "react";
import { render, waitFor } from "@testing-library/react";
import QuarterFilterForm from "main/components/Courses/QuarterFilterForm";
import userEvent from "@testing-library/user-event";

describe("QuarterFilterForm tests", () => {

  const sampleFilterVal = "no clue";

  test("empty component renders without crashing", () => {
    render(<QuarterFilterForm />);
  });



  test("upsert filter works", async () => {

    const upsertFilterMock = jest.fn();

    const { getByLabelText, getByText } = render
      (<QuarterFilterForm upsertFilter={upsertFilterMock} />)
      ;

    const nameInput = getByLabelText("Enter quarter to filter by");
    userEvent.type(nameInput, sampleFilterVal);

    const submitButton = getByText("Submit");
    userEvent.click(submitButton);

    expect(upsertFilterMock).toHaveBeenCalledTimes(1);
    expect(upsertFilterMock).toHaveBeenCalledWith(sampleFilterVal);
  });
  test("delete button calls the delete function", async () => {
    const deleteFilterMock = jest.fn();
    const { getByText } = render
      (<QuarterFilterForm deleteFilter={deleteFilterMock} />)
    const deleteButton = getByText("delete");
    userEvent.click(deleteButton);
    expect(deleteFilterMock).toHaveBeenCalledTimes(1);
  })

});
