import { fetchWithToken } from "main/utils/fetch";

const buildCreateFilter = (getToken, onSuccess, onError) => {
  const func = async (filter) => {
    try {
      await fetchWithToken(`/api/admin/filter/`, getToken, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(filter),
      });
      onSuccess();
    } catch (err) {
      onError(err);
    }
  };
  return func
}

const buildUpdateFilter = (getToken, onSuccess, onError) => {
  debugger
  const func = async (item) => {
    try {
        //there will only be one filter active in db, id will always be 1
      await fetchWithToken(`/api/admin/filter/1`, getToken, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(item),
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
      await fetchWithToken(`/api/admin/courses/1`, getToken, {
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

export { buildCreateFilter, buildDeleteFilter, buildUpdateFilter };