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

const buildUpdateTutorAssignment  = (getToken, onSuccess, onError) => {
  const func = async (item, id) => {
    try {
      await fetchWithToken(`/api/member/tutorAssignments/${id}`, getToken, {
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

export { buildCreateTutorAssignment, buildUpdateTutorAssignment  };
