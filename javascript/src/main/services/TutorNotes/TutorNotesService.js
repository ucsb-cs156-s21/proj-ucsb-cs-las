import { fetchWithToken } from "main/utils/fetch";

const buildCreateTutorNotes = (getToken, onSuccess, onError) => {
  const func = async (tutorNotes) => {
    try {
      await fetchWithToken(`/api/member/tutorNotes`, getToken, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(tutorNotes),
      });
      onSuccess();
    } catch (err) {
      onError(err);
    }
  };
  return func
}

const buildDeleteTutorNotes = (getToken, onSuccess, onError) => {
  const func = async id => {
    try {
      await fetchWithToken(`/api/admin/tutorNotes/${id}`, getToken, {
        method: "DELETE",
        headers: {
          "content-type": "application/json"
        },
        noJSON: true
      });
      onSuccess();
    } catch (err) {
      onError(err);
    }
  };
  return func;
};

export { buildCreateTutorNotes, buildDeleteTutorNotes };