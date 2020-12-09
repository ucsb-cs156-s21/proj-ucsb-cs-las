import React from "react";
import { render, waitFor } from "@testing-library/react";
import OfficeHourForm from "main/components/OfficeHours/OfficeHourForm";
import userEvent from "@testing-library/user-event";

describe("OfficeHourForm tests", () => {


  test("component renders without crashing", () => {
    render(<OfficeHourForm />);
  });


});
