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
	    quarter: "W21",
	    instructorFirstName: "Chandra",
	    instructorLastName: "Krintz",
	    instructorEmail: "krintz@example.org",
	  },
	];

	const filterdata = [
	  {
	    id: "2",
	    activeQuarter: "All"
	  }
	];

	const filterData = [
	  {
	    id: "1",
	    activeQuarter:"F20"}
	];

	beforeEach(() => {
	  useSWR.mockImplementation((key, getter) => {
		  if(key[0] === "/api/public/courses/") {
			  return {
				  data : courses
			  };
		  } else {
			  return {
			    data : filterData
			  }
		  }
	  });
	});
	afterEach(() => {
	  jest.clearAllMocks();
	});

  test("renders without crashing", () => {
    render(<Home />);
  });

  	test("Existing filterdata, and the value is an array with one element in it with the above data", () => {
		useSWR.mockImplementation((key, getter) => {
			if(key === "/api/public/courses/") {
				return {
					data : courses
				};
			} else {
				return {
					data : filterData
				}
			}
		});
		render(<Home />);
		expect(filterData).toBeDefined();
		expect(filterData).toEqual([{"id":"1", "activeQuarter": "F20"}]);
	});

	test("Existing filterdata, and the value is refering to all the quarters", () => {
		useSWR.mockImplementation((key, getter) => {
			if (key === "/api/public/courses/") {
				return {
					data: courses
				};
			} else {
				return {
					data: filterdata
				}
			}
		});
		render(<Home />);
		expect(filterdata).toBeDefined();
		expect(filterdata).toEqual([{ "id": "2", "activeQuarter": "All" }]);
	});
});

