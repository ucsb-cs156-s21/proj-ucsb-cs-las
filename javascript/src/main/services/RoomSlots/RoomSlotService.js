import { fetchWithToken } from "main/utils/fetch";

const buildCreateRoomSlot = (getToken, onSuccess, onError) => {
  const func = async (roomSlot) => {
    try {
      console.log(roomSlot);
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


export { buildCreateRoomSlot/*, buildUpdateRoomSlot*/ };