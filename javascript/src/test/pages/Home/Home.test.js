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

  const filterdata_1 = [
    {
      id: "2",
      activeQuarter: "All"
    }
  ];

  const filterdata_2 = [
    {
      id: "1",
      activeQuarter: "F20"
    }
  ];

  beforeEach(() => {
    useSWR.mockImplementation((key) => {
      if (key[0] === "/api/public/courses/") {
        return {
          data: courses
        };
      } else {
        return {
          data: filterdata_2
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
    useSWR.mockImplementation((key) => {
      if (key === "/api/public/courses/") {
        return {
          data: courses
        };
      } else {
        return {
          data: filterdata_2
        }
      }
    });
    render(<Home />);
    expect(filterdata_2).toBeDefined();
    expect(filterdata_2).toEqual([{ "id": "1", "activeQuarter": "F20" }]);
  });

  test("Existing filterdata, and the value is an array with one element in it with the above data", () => {
    useSWR.mockImplementation((key) => {
      if (key === "/api/public/courses/") {
        return {
          data: courses
        };
      } else {
        return {
          data: filterdata_1
        }
      }
    });
    render(<Home />);
    expect(filterdata_1).toBeDefined();
    expect(filterdata_1).toEqual([{ "id": "2", "activeQuarter": "All" }]);
  });
});