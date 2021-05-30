import React from "react";
import { render } from "@testing-library/react";
import useSWR from "swr";
import { useAuth0 } from "@auth0/auth0-react";
import userEvent from "@testing-library/user-event";
import OfficeHourCSVButton from "main/components/OfficeHours/OfficeHourCSVButton";

jest.mock("swr");
jest.mock("@auth0/auth0-react");
jest.mock("main/utils/fetch");

describe("Office Hour CSV Upload test", () => {
    const user = {
        name: "test user",
    };
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
    const getAccessTokenSilentlySpy = jest.fn();
    const mutateSpy = jest.fn();
    beforeEach(() => {
        useAuth0.mockReturnValue({
            user,
            getAccessTokenSilently: getAccessTokenSilentlySpy,
        });
        useSWR.mockReturnValue({
            data: courses,
            error: undefined,
            mutate: mutateSpy,
        });
    });
    test("renders without crashing", () => {
        render(<OfficeHourCSVButton />);
    });
    test("upload file without crashing", () => {
        const addTask = jest.fn();
        addTask.mockImplementation(async () => {   
            throw new Error();
        });
        const testFile = new File(['test'], 'test.csv', {type: 'text/csv'});
        const { getByTestId, getByText } = render(<OfficeHourCSVButton />);
        const input = getByTestId("csv-input");
        userEvent.upload(input, testFile);
        expect(input.files[0]).toStrictEqual(testFile)
        expect(input.files.item(0)).toStrictEqual(testFile)
        expect(input.files).toHaveLength(1)
        userEvent.click(getByText("Submit")); 
    });

}); 