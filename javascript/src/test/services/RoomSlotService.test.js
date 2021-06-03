import { buildCreateRoomSlot } from "main/services/RoomSlots/RoomSlotService";

import { fetchWithToken } from "main/utils/fetch";
import { buildDeleteRoomSlot } from "../../main/services/RoomSlots/RoomSlotService";

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

    test("buildDeleteCourse and invoke deleteRoomSlot", async () => {
        const deleteRoomSlot = buildDeleteRoomSlot(getToken, onSuccess, onError);
        await deleteRoomSlot();
        expect(onSuccess).toBeCalledTimes(1);
    });

    test("buildDeleteRoomSlot where we expect onError to be called", async () => {
        fetchWithToken.mockImplementation(async () => { throw new Error("mock error"); });
        const deleteRoomSlot = buildDeleteRoomSlot(getToken, onSuccess, onError);
        await deleteRoomSlot();
        expect(onError).toBeCalledTimes(1);
    });

});