import { fetchWithToken } from "main/utils/fetch";

const buildUpsertFilter = (getToken, onSuccess, onError) => {
  const func = async (quarterString) => {
    if (quarterString === "")
        quarterString = "All"
    try {
      await fetchWithToken(`/api/admin/filter/${quarterString}`, getToken, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
      });
      onSuccess();
    } catch (err) {
      onError(err);
    }
  };
  return func
}


export {buildUpsertFilter};