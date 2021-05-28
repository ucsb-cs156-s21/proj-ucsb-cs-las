import { uploadRoomSlotCSV } from "main/services/RoomSlot/UploadRoomSlotCSV";

import { fetchWithToken } from "main/utils/fetch";

jest.mock("main/utils/fetch", () => ({
    fetchWithToken: jest.fn()
}));


//need to add more test if there's new functionality in the UploadRoomSlotCSV
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
});
