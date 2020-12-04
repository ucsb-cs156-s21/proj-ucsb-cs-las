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


const buildDeleteFilter = (getToken, onSuccess, onError) => {
  const func = async () => {
    try {
      //there will only be one filter active in db, id will always be 1
      await fetchWithToken(`/api/admin/filter/nuke`, getToken, {
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

export { buildUpsertFilter, buildDeleteFilter };