import React from "react";
import { render } from "@testing-library/react";
import Home from "main/pages/Home/Home";
import useSWR from "swr";
jest.mock("swr");

describe("Home tests", () => {
  const filterData = [
    {
      id: "1",
      activeQuarter:"something that exists that isnt all"}
  ];

  test("renders without crashing", () => {
    useSWR.mockReturnValue({
      data:undefined
    });
    render(<Home />);
  });
  test("Existing filterdata, and the value is an array with one element in it with the above data", () => {
    useSWR.mockReturnValue({
      data: filterData
    })
    render(<Home />);
    expect(filterData).toBeDefined();
    expect(filterData).toEqual([{"id":"1", "activeQuarter": "something that exists that isnt all"}]);
  })
});
