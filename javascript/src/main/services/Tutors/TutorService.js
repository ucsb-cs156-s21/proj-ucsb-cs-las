import { fetchWithToken } from "main/utils/fetch";

const buildTutorSearch = (getToken, onSuccess, onError) => {
  const func = async (query) => {
    try {
      await fetchWithToken(`/api/admin/tutorsearch?q=${query.value}`,
      getToken, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      onSuccess();
    } catch (err) {
      onError(err);
    }
  };
  return func;
}

export { buildTutorSearch };