import React from "react";
import { Jumbotron } from "react-bootstrap";
import { waitFor, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "main/pages/Home/Home"
import useSWR from "swr";
jest.mock("swr");
import { fetchWithoutToken } from "main/utils/fetch";
jest.mock("main/utils/fetch");

import { useHistory } from "react-router-dom";
// import { Link } from "react-router-dom";
// jest.mock("react-router-dom", () => ({
//   useHistory: jest.fn(), // and this one too
//   Link: jest.fn(), // and this one too
//   Router: jest.fn(),
//   Switch: jest.fn(),
//   Route: jest.fn()
// }));

describe("Home tests", () => {
	const courses = [
	  {
	    name: "CMPSC 156",
	    id: 1,
	    quarter: "F20",
	    instructorFirstName: "Phill",
	    instructorLastName: "Conrad",
	    instructorEmail: "phtcon@ucsb.edu",
	  },
	  {
	    name: "CMPSC 148",
	    id: 2,
	    quarter: "F20",
	    instructorFirstName: "Chandra",
	    instructorLastName: "Krintz",
	    instructorEmail: "krintz@example.org",
	  },
	];
	beforeEach(() => {
	  useSWR.mockReturnValue({
	    data: courses,
	  });
	});
	afterEach(() => {
	  jest.clearAllMocks();
	});
  test("renders without crashing", () => {
    render(<Home/>);
  });
});