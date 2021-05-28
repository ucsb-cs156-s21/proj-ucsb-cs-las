import { fetchWithToken } from "main/utils/fetch";

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

export default uploadRoomSlotCSV;