import React from "react";
import {render } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
jest.mock("@auth0/auth0-react");
import NewCourse from "main/pages/Courses/NewCourse";

describe("New Course page test", () => {
  const courses = 
    {
      name: "CMPSC 156",
      id: 1,
      quarter: "F20",
      instructorFirstName: "Phill",
      instructorLastName: "Conrad",
      instructorEmail: "phtcon@ucsb.edu",
    };
  const user = {
    name: "test user",
  };
  const getAccessTokenSilentlySpy = jest.fn();
  const mutateSpy = jest.fn();

  beforeEach(() => {
    useAuth0.mockReturnValue({
      admin: undefined,
      getAccessTokenSilently: getAccessTokenSilentlySpy,
      user: user
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    render(<NewCourse />);
  });

});


