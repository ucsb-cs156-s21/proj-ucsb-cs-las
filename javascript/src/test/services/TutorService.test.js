import { buildCreateTutor, buildDeleteTutor, buildUpdateTutor, uploadTutorsCSV } from "main/services/Tutor/TutorService";

import { fetchWithToken } from "main/utils/fetch";

jest.mock("main/utils/fetch", () => ({
    fetchWithToken:  jest.fn()
}));

describe("TutorService tests", () => {

    const getToken = jest.fn();
    const onSuccess = jest.fn(); 
    const onError = jest.fn();

    beforeEach( () => {
        jest.clearAllMocks();
    });

    test("buildCreateTutor and invoke createTutor", async () => {
        const createTutor = buildCreateTutor(getToken, onSuccess, onError);
        await createTutor();
        expect(onSuccess).toBeCalledTimes(1);
    });
    test("buildUpdateTutor and invoke updateTutor", async () => {
        const updateTutor = buildUpdateTutor(getToken, onSuccess, onError);
        await updateTutor();
        expect(onSuccess).toBeCalledTimes(1);
    });
    test("buildDeleteTutor and invoke deleteTutor", async () => {
        const deleteTutor = buildDeleteTutor(getToken, onSuccess, onError);
        await deleteTutor();        
        expect(onSuccess).toBeCalledTimes(1);
    });
    test("uploadTutorsCSV and invoke uploadTutor", async () => {
        const uploadTutor = uploadTutorsCSV(getToken, onSuccess, onError); 
        await uploadTutor(); 
        expect(onSuccess).toBeCalledTimes(1); 
    });

    test("buildCreateTutor where we expect onError to be called", async () => {
        fetchWithToken.mockImplementation( async () => { throw new Error("mock error"); } );
        const createTutor = buildCreateTutor(getToken, onSuccess, onError);
        await createTutor();
        expect(onError).toBeCalledTimes(1);
    });

    test("buildUpdateTutor where we expect onError to be called", async () => {
        fetchWithToken.mockImplementation( async () => { throw new Error("mock error"); } );
        const updateTutor = buildUpdateTutor(getToken, onSuccess, onError);
        await updateTutor();
        expect(onError).toBeCalledTimes(1);
    });

    test("buildDeleteTutor where we expect onError to be called", async () => {
        fetchWithToken.mockImplementation( async () => { throw new Error("mock error"); } );
        const deleteTutor = buildDeleteTutor(getToken, onSuccess, onError);
        await deleteTutor();
        expect(onError).toBeCalledTimes(1);
    });
    test("uploadTutorsCSV where we expect onError to be called", async () => {
        fetchWithToken.mockImplementation( async () => { throw new Error("mock error"); } );
        const uploadTutor = uploadTutorsCSV(getToken, onSuccess, onError); 
        await uploadTutor(); 
        expect(onError).toBeCalledTimes(1);
    });
});
