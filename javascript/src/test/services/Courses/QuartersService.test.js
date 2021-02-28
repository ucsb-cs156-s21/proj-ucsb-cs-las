import { fetchQuarters } from "main/services/Courses/QuartersService";

import fetch from "isomorphic-unfetch";
jest.mock("isomorphic-unfetch");

describe("statisticsService tests", () => {
    const exampleResponse = [ "20201, 20202, 20204, 20211"];
    test("fetchQuarters on success", async () => {

        fetch.mockResolvedValue({
            status: 200,
            ok: true,
            json: () => {
                return exampleResponse;
            },
        });

        const result = await fetchQuarters();
        expect(result).toBe(exampleResponse);

    });

    test("fetchQuarters on failure", async () => {

        fetch.mockResolvedValue({
            status: 404,
            ok: false,
            url: "/api/someEndpoint"
        });

        await expect(fetchQuarters())
            .rejects
            .toThrow('getting /api/someEndpoint, status=404');

    });
});