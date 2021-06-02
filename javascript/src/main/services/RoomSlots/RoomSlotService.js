import { fetchWithToken } from "main/utils/fetch";

const buildCreateRoomSlot = (getToken, onSuccess, onError) => {
  const func = async (roomSlot) => {
    try {
      const result = await fetchWithToken(`/api/admin/roomslot`, getToken, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(roomSlot),
      });
      onSuccess(result);
    } catch (err) {
      onError(err);
    }
  };
  return func
}

const buildDeleteRoomSlot = (getToken, onSuccess, onError) => {
  const func = async (id) => {
    try {
      await fetchWithToken(`/api/admin/roomslot/${id}`, getToken, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        noJSON: true,
      });
      onSuccess();
    } catch (err) {
      onError(err);
    }
  }
  return func;
}


export { buildCreateRoomSlot, buildDeleteRoomSlot};