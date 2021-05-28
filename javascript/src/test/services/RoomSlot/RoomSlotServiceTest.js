import { buildCreateTutor, buildDeleteTutor, buildUpdateTutor, uploadTutorsCSV, buildDeleteAllTutors } from "main/services/Tutor/TutorService";

import { fetchWithToken } from "main/utils/fetch";

jest.mock("main/utils/fetch", () => ({
    fetchWithToken: jest.fn()
}));

describe("TutorService tests", () => {

    const getToken = jest.fn();
    const onSuccess = jest.fn();
    const onError = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    