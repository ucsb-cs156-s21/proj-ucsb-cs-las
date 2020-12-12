import { fetchWithToken } from "main/utils/fetch";

const buildSearchTutorHistoryByCourse = (getToken, onSuccess, onError) => {
  const func = async (query) => {
    try {
      const data = await fetchWithToken(`/api/public/tutorAssignment/byCourseNumber/${query.value}`,
        getToken, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      onSuccess(data);
    } catch (err) {
      onError(err);
    }
  };
  return func;
}

export { buildSearchTutorHistoryByCourse };