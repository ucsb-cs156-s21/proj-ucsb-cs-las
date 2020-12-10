import React from "react";
import { waitFor, render } from "@testing-library/react";
import useSWR from "swr";
jest.mock("swr");
import { useAuth0 } from "@auth0/auth0-react";
jest.mock("@auth0/auth0-react");
import TutorList from "main/pages/Courses/TutorList";
import userEvent from "@testing-library/user-event";
import { fetchWithToken } from "main/utils/fetch";
jest.mock("main/utils/fetch");

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"), // use real functions 
    useParams: jest.fn(), // except for just this one
  }));

describe("New Tutor page test", () => {
    const Tutor = 
    {
        id: '1',
        first_name: 'Andrew',
        last_name: 'Lu', 
        email: 'alu@ucsb.edu',
    };
    const user = {
        name: "test user",
      };
      const getAccessTokenSilentlySpy = jest.fn();
      const mutateSpy = jest.fn();
    beforeEach(() => {
        useParams.mockReturnValue({
        data: TutorList,
        error: undefined,
        mutate: mutateSpy,
        });
      });  
      afterEach(() => {
        jest.clearAllMocks();
      });
    
      test("renders without crashing", () => {
        render(<TutorList />);
      });
    
  
})