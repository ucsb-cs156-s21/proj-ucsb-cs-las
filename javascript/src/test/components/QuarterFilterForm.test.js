import React from "react";
import { render } from "@testing-library/react";
import QuarterFilterForm from "main/components/Courses/QuarterFilterForm";
import userEvent from "@testing-library/user-event";

describe("QuarterFilterForm tests", () => {

  const sampleFilterVal = "W21";

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

});
