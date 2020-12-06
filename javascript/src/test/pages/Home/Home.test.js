import React from "react";
import { render } from "@testing-library/react";
import Home from "main/pages/Home/Home";
import useSWR from "swr";
jest.mock("swr");

describe("Home tests", () => {
  const filterData = [
    {id: "1",
  activeQuarter:"something that exists that isnt all"}
  ];

  test("renders without crashing", () => {
    useSWR.mockReturnValue({
      data:undefined
    });
    render(<Home />);
  });
  test("conditionalrendering funtion exists", () => {
    useSWR.mockReturnValue({
      data: filterData
    })
    render(<Home />);
  })
});
