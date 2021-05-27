import React from "react";
import { render } from "@testing-library/react";
import Home from "main/pages/Home/Home"
import useSWR from "swr";
jest.mock("swr");
jest.mock("main/utils/fetch");

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

	const filterData1 = [
	  {
	    id: "2",
	    activeQuarter: "All"
	  }
	];

	const filterData2 = [
	  {
	    id: "1",
	    activeQuarter:"F20"}
	];

	beforeEach(() => {
	  useSWR.mockImplementation((key, _getter) => {
		  if(key[0] === "/api/public/courses/") {
			  return {
				  data : courses
			  };
		  } else {
			  return {
			    data : filterData2
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

  	test("Existing filterData, and the value is an array with one element in it with the above data", () => {
		useSWR.mockImplementation((key, _getter) => {
			if(key === "/api/public/courses/") {
				return {
					data : courses
				};
			} else {
				return {
					data : filterData2
				}
			}
		});
		render(<Home />);
		expect(filterData2).toBeDefined();
		expect(filterData2).toEqual([{"id":"1", "activeQuarter": "F20"}]);
	});

	test("Existing filterData, and the value is refering to all the quarters", () => {
		useSWR.mockImplementation((key, _getter) => {
			if (key === "/api/public/courses/") {
				return {
					data: courses
				};
			} else {
				return {
					data: filterData1
				}
			}
		});
		render(<Home />);
		expect(filterData1).toBeDefined();
		expect(filterData1).toEqual([{ "id": "2", "activeQuarter": "All" }]);
	});
});