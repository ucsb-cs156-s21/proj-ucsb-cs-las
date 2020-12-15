import { fetchWithToken } from "main/utils/fetch";

const buildCreateOfficeHour = (getToken, onSuccess, onError) => {
  const func = async (officeHour) => {
    try {
      await fetchWithToken(`/api/admin/officeHours/`, getToken, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(officeHour),
      });
      onSuccess();
    } catch (err) {
      onError(err);
    }
  };
  return func
}

const buildDeleteOfficeHour = (getToken, onSuccess, onError) => {
  const func = async (id) => {
    try {
      await fetchWithToken(`/api/admin/officeHours/${id}`, getToken, {
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

export { buildCreateOfficeHour, buildDeleteOfficeHour };
