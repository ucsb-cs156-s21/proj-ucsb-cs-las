import React from "react";
import { render } from "@testing-library/react";
import TutorTable from "main/components/Tutor/TutorTable";


describe("TutorForm tests", () => {
  test("renders without crashing", () => {
    render(<TutorTable />);
  });
});