import { fetchWithToken } from "main/utils/fetch";

const buildCreateTutorAssignment = (getToken, onSuccess, onError) => {
  const func = async (tutorAssignment) => {
    try {
      await fetchWithToken(`/api/member/tutorAssignments`, getToken, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(tutorAssignment),
      });
      onSuccess();
    } catch (err) {
      onError(err);
    }
  };
  return func
}

export { buildCreateTutorAssignment };
