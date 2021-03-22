import { quarterProvider, courseProvider, tutorAssignmentProvider } from "main/services/selectorSupport.js"

import { fetchWithoutToken } from "main/utils/fetch";
jest.mock("main/utils/fetch", () => ({
    fetchWithoutToken: jest.fn()
  }));


describe("selectorSupport tests", () => {

    test("quarterProvider fetches from the correct backend api endpoint", async () => {
        await quarterProvider();
        expect(fetchWithoutToken).toBeCalledWith("/api/public/quarters");
    });

    test("courseProvider fetches from right backend api endpoint with right param", async () => {
        await courseProvider("20214");
        expect(fetchWithoutToken).toBeCalledWith("/api/public/courses/forQuarter/20214");
    });

    test("tutorAssignmentProvider fetches from right backend api endpoint with right param", async () => {
        await tutorAssignmentProvider("42");
        expect(fetchWithoutToken).toBeCalledWith("/api/public/tutorAssignment/42");
    });

});
