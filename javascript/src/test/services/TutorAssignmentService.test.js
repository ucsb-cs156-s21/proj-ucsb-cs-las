import { buildCreateTutorAssignment, buildDeleteTutorAssignment, buildUpdateTutorAssignment } from "main/services/TutorAssignment/TutorAssignmentService";

import { fetchWithToken } from "main/utils/fetch";

jest.mock("main/utils/fetch", () => ({
    fetchWithToken:  jest.fn()
}));

describe("TutorAssignmentService tests", () => {

    const getToken = jest.fn();

    const onSuccess = jest.fn();

    const onError = jest.fn();

    beforeEach( () => {
        jest.clearAllMocks();
    });

    test("buildCreateTutorAssignment and invoke createTutorAssignment", async () => {
        const createTutorAssignment = buildCreateTutorAssignment(getToken, onSuccess, onError);
        await createTutorAssignment();
        expect(onSuccess).toBeCalledTimes(1);
    });
    test("buildCreateTutorAssignment where we expect onError to be called", async () => {
        fetchWithToken.mockImplementation( async () => { throw new Error("mock error"); } );
        const createTutorAssignment = buildCreateTutorAssignment(getToken, onSuccess, onError);
        await createTutorAssignment();
        expect(onError).toBeCalledTimes(1);
    });

});

