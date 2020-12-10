import React from "react";
import { render } from "@testing-library/react";
import TutorTable from "main/components/Footer/AppFooter";


describe("TutorForm tests", () => {
  test("renders without crashing", () => {
    render(<TutorTable />);
  });
});
