import { buildCreateTutorNotes, buildDeleteTutorNotes } from "main/services/TutorNotes/TutorNotesService";

import { fetchWithToken } from "main/utils/fetch";

jest.mock("main/utils/fetch", () => ({
    fetchWithToken:  jest.fn()
}));

describe("TutorNotesService tests", () => {

    const getToken = jest.fn();
    const onSuccess = jest.fn(); 
    const onError = jest.fn();

    beforeEach( () => {
        jest.clearAllMocks();
    });

    test("buildCreateTutorNotes and invoke createTutor", async () => {
        const createTutorNotes = buildCreateTutorNotes(getToken, onSuccess, onError);
        await createTutorNotes();
        expect(onSuccess).toBeCalledTimes(1);
    });
    test("buildDeleteTutor and invoke deleteTutor", async () => {
        const deleteTutorNotes = buildDeleteTutorNotes(getToken, onSuccess, onError);
        await deleteTutorNotes();        
        expect(onSuccess).toBeCalledTimes(1);
    });
    test("buildCreateTutorNotes where we expect onError to be called", async () => {
        fetchWithToken.mockImplementation( async () => { throw new Error("mock error"); } );
        const createTutorNotes = buildCreateTutorNotes(getToken, onSuccess, onError);
        await createTutorNotes();
        expect(onError).toBeCalledTimes(1);
    });
    test("buildDeleteTutorNotes where we expect onError to be called", async () => {
        fetchWithToken.mockImplementation( async () => { throw new Error("mock error"); } );
        const deleteTutorNotes = buildDeleteTutorNotes(getToken, onSuccess, onError);
        await deleteTutorNotes();
        expect(onError).toBeCalledTimes(1);
    });
});
