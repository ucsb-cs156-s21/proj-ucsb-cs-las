import React from "react";
import { render } from "@testing-library/react";
import QuarterFilterForm from "main/components/Courses/QuarterFilterForm";
import userEvent from "@testing-library/user-event";

describe("QuarterFilterForm tests", () => {

  const sampleFilterVal = "no clue";
  const formattedFilterVal1 = "W21";
  const formattedFilterVal2 = "WW2";
  const formattedFilterVal3 = "21W";
  const formattedFilterVal4 = "w21";


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

    expect(upsertFilterMock).toHaveBeenCalledTimes(0);
  });

  test("set quarter filter format works with right format", async () => {
    
    const quarterFilterMock = jest.fn();

    const { getByLabelText, getByText } = render
      (<QuarterFilterForm upsertFilter = {quarterFilterMock} />);

      const nameInput = getByLabelText("Enter quarter to filter by");
      userEvent.type(nameInput, formattedFilterVal1);

      const submitButton = getByText("Submit");
      userEvent.click(submitButton);

      expect(quarterFilterMock).toHaveBeenCalledTimes(1);
      expect(quarterFilterMock).toBeCalledWith(formattedFilterVal1);
  })

  test("set quarter filter format works with wrong format(QQy)", async () => {
    
    const quarterFilterMock = jest.fn();

    const { getByLabelText, getByText } = render
      (<QuarterFilterForm upsertFilter = {quarterFilterMock} />);

      const nameInput = getByLabelText("Enter quarter to filter by");
      userEvent.type(nameInput, formattedFilterVal2);

      const submitButton = getByText("Submit");
      userEvent.click(submitButton);

      expect(quarterFilterMock).toHaveBeenCalledTimes(0);
  })

  test("set quarter filter format works with wrong format(yyQ)", async () => {
    
    const quarterFilterMock = jest.fn();

    const { getByLabelText, getByText } = render
      (<QuarterFilterForm upsertFilter = {quarterFilterMock} />);

      const nameInput = getByLabelText("Enter quarter to filter by");
      userEvent.type(nameInput, formattedFilterVal3);

      const submitButton = getByText("Submit");
      userEvent.click(submitButton);

      expect(quarterFilterMock).toHaveBeenCalledTimes(0);
  })

  test("set quarter filter format works with wrong format(lower case)", async () => {
    
    const quarterFilterMock = jest.fn();

    const { getByLabelText, getByText } = render
      (<QuarterFilterForm upsertFilter = {quarterFilterMock} />);

      const nameInput = getByLabelText("Enter quarter to filter by");
      userEvent.type(nameInput, formattedFilterVal4);

      const submitButton = getByText("Submit");
      userEvent.click(submitButton);

      expect(quarterFilterMock).toHaveBeenCalledTimes(0);
  })

});
