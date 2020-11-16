import React from "react";
import { render } from "@testing-library/react";
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import EditCourse from "main/pages/Courses/EditCourse";

import useSWR from "swr";

jest.mock("swr");
import { useAuth0 } from "@auth0/auth0-react";
jest.mock("@auth0/auth0-react");


describe("Edit Course page test", () => {
  const course = 
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
    useSWR.mockReturnValue({
      data: course,
      error: undefined,
      mutate: mutateSpy,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    const history = createMemoryHistory();
    const route = '/courses/edit/1';
    history.push(route);

    const { getByText } = render(
        <Router history={history}>
          <EditCourse  />
        </Router>
      );
  });

  test("Renders with existing course", () => {
    const history = createMemoryHistory();
    const route = '/courses/edit/1';
    history.push(route);

    const { getByText } = render(
        <Router history={history}>
          <EditCourse  />
        </Router>
      );
  });

  test("Renders with no existing course", () => {
    const history = createMemoryHistory();
    const route = '/courses/edit/1';
    history.push(route);

    useSWR.mockReturnValue({
        data: undefined,
        error: undefined,
        mutate: mutateSpy,
      });
    
    const { getByTestId } = render(
        <Router history={history}>
          <EditCourse  />
        </Router>
      );

    const spinner = getByTestId("spinner");
    expect(spinner).toBeInTheDocument();

  });

});


