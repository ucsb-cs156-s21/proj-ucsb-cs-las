import React from "react";
import { render } from "@testing-library/react";
import ViewLogins from "main/pages/Admin/ViewLogins";

import useSWR from "swr";

import { useAuth0 } from "@auth0/auth0-react";

import { fetchWithToken } from "main/utils/fetch";
jest.mock("swr");
jest.mock("@auth0/auth0-react");
jest.mock("main/utils/fetch");

describe("ChannelList tests", () => {
  
      const logins = [
        {
            "timestamp": "2020-12-08 14:41:48.481 -0800",
            "email": "matthew_wong@ucsb.edu",
            "firstName": "matthew",
            "lastname": "wong"
        }
    ];
  
      beforeEach(() => {
        useAuth0.mockReturnValue({
          getAccessTokenSilently: jest.fn(),
        });
      });
  
  const mockBackend = (results) => {
        useSWR.mockImplementation(([endpoint, getToken], fetch) => {
            if (endpoint === "/api/admin/logins")
              return {
                data: results,
              };
            else
                fail(`test called on unexpected endpoint: ${endpoint}`);
          });
    }
  
    test("renders without crashing", () => {
        useSWR.mockReturnValue({});
        render(<ViewLogins />);
    });
    
    test("Accesses logins from backend", () => {
        const exampleLogin = {
            "timestamp": "2020-12-08 14:41:48.481 -0800",
            "email": "test@ucsb.edu",
            "firstName": "matthew",
            "lastName": "wong"
        };

        useSWR.mockReturnValue({
            'data': [exampleLogin]
        });
        const { getByText } = render(<ViewLogins />);
        const timestampElement = getByText(/2020-12-08 14:41:48.481 -0800/);
        const emailElement = getByText(/test@ucsb.edu/);
        const firstNameElement = getByText(/matthew/);
        const lastNameElement = getByText(/wong/);

        expect(timestampElement).toBeInTheDocument();
        expect(emailElement).toBeInTheDocument();
        expect(firstNameElement).toBeInTheDocument();
        expect(lastNameElement).toBeInTheDocument();
    });

});
