import { buildCreateRoomSlot } from "main/services/RoomSlots/RoomSlotService";

import { fetchWithToken } from "main/utils/fetch";

jest.mock("main/utils/fetch", () => ({
    fetchWithToken:  jest.fn()
}));

describe("RoomSlotService tests", () => {
    const getToken = jest.fn();
    const onSuccess = jest.fn();
    const onError = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("buildCreateRoomSlot and invoke createRoomSlot", async () => {
        const createRoomSlot = buildCreateRoomSlot(getToken, onSuccess, onError);
        await createRoomSlot();
        expect(onSuccess).toBeCalledTimes(1);
    });

    test("buildCreateRoomSlot with error expected", async () => {
        fetchWithToken.mockImplementation(async () => { throw new Error("mock error"); });
        const createRoomSlot = buildCreateRoomSlot(getToken, onSuccess, onError);
        await createRoomSlot();
        expect(onError).toBeCalledTimes(1);
    });
});