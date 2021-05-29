import { uploadRoomSlotCSV, buildCreateRoomSlot } from "main/services/RoomSlots/UploadRoomSlotCSV";

import { fetchWithToken } from "main/utils/fetch";

jest.mock("main/utils/fetch", () => ({
    fetchWithToken: jest.fn()
}));


describe("RoomSlot tests", () => {

    const getToken = jest.fn();
    const onSuccess = jest.fn();
    const onError = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("uploadRoomSlotCSV and invoke uploadRoomSlot", async () => {
        const uploadRoomSlot = uploadRoomSlotCSV(getToken, onSuccess, onError);
        await uploadRoomSlot();
        expect(onSuccess).toBeCalledTimes(1);
    });

    test("uploadRoomSlotCSV where we expect onError to be called", async () => {
        fetchWithToken.mockImplementation(async () => { throw new Error("mock error"); });
        const uploadRoomSlot = uploadRoomSlotCSV(getToken, onSuccess, onError);
        await uploadRoomSlot();
        expect(onError).toBeCalledTimes(1);
    });
    
    test("buildCreateRoomSlot and invoke createRoomSlot", async () => {
        const createRoomSlot = buildCreateRoomSlot(getToken, onSuccess, onError);
        await createRoomSlot();
        expect(onSuccess).toBeCalledTimes(1);
    });

    test("buildCreateRoomSlot where we expect onError to be called", async () => {
        fetchWithToken.mockImplementation(async () => { throw new Error("mock error"); });
        const createRoomSlot = buildCreateRoomSlot(getToken, onSuccess, onError);
        await createRoomSlot();
        expect(onError).toBeCalledTimes(1);
    });
});
