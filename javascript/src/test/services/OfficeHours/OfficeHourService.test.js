import { buildCreateOfficeHour, buildDeleteOfficeHour, buildUpdateOfficeHour } from "main/services/OfficeHours/OfficeHourService";

import { fetchWithToken } from "main/utils/fetch";

jest.mock("main/utils/fetch", () => ({
    fetchWithToken:  jest.fn()
}));

describe("OfficeHourService tests", () => {

    const getToken = jest.fn();
    const onSuccess = jest.fn();
    const onError = jest.fn();

    beforeEach( () => {
        jest.clearAllMocks();
    });

    test("buildCreateOfficeHour and invoke createOfficeHour", async () => {
        const createOfficeHour = buildCreateOfficeHour(getToken, onSuccess, onError);
        await createOfficeHour();
        expect(onSuccess).toBeCalledTimes(1);
    });

    test("buildDeleteOfficeHour and invoke deleteOfficeHour", async () => {
        const deleteOfficeHour = buildDeleteOfficeHour(getToken, onSuccess, onError);
        await deleteOfficeHour();
        expect(onSuccess).toBeCalledTimes(1);
    });
    test("buildCreateOfficeHour where we expect onError to be called", async () => {
        fetchWithToken.mockImplementation( async () => { throw new Error("mock error"); } );
        const createOfficeHour = buildCreateOfficeHour(getToken, onSuccess, onError);
        await createOfficeHour();
        expect(onError).toBeCalledTimes(1);
    });

    test("buildUpdateOfficeHour and invoke updateOfficeHour", async () => {
        const updateOfficeHour = buildUpdateOfficeHour(getToken, onSuccess, onError);
        await updateOfficeHour();
        expect(onSuccess).toBeCalledTimes(1);
    });

    test("buildUpdateOfficeHour where we expect onError to be called", async () => {
        fetchWithToken.mockImplementation( async () => { throw new Error("mock error"); } );
        const updateOfficeHour = buildUpdateOfficeHour(getToken, onSuccess, onError);
        await updateOfficeHour();
        expect(onError).toBeCalledTimes(1);
    });

    test("buildDeleteOfficeHour where we expect onError to be called", async () => {
        fetchWithToken.mockImplementation( async () => { throw new Error("mock error"); } );
        const deleteOfficeHour = buildDeleteOfficeHour(getToken, onSuccess, onError);
        await deleteOfficeHour();
        expect(onError).toBeCalledTimes(1);
    });

});