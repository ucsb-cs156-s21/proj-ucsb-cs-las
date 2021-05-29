import { fetchWithToken } from "main/utils/fetch";

//maybe not enough? => In the issue:  If it is a valid CSV file, an entry is created in the database for each tutor in the file
const uploadRoomSlotCSV = (getToken, onSuccess, onError) => {
    const func = async (file) => {
        const data = new FormData();
        data.append("csv", file);

        try {
            await fetchWithToken('/api/admin/roomslot/upload', getToken, {
                method: "POST",
                body: data
            });
            onSuccess();
        } catch (err) {
            onError(err);
        }
    };
    return func;
}

const buildCreateRoomSlot = (getToken, onSuccess, onError) => {
    const func = async (roomSlot) => {
        try {
            await fetchWithToken(`/api/admin/roomslot/`, getToken, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(roomSlot),
            });
            onSuccess();
        } catch (err) {
            onError(err);
        }
    };
    return func;
}

export default { uploadRoomSlotCSV, buildCreateRoomSlot };
