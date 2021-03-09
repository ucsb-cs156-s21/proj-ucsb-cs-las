import { fetchWithToken } from "main/utils/fetch";

const buildCreateTutor = (getToken, onSuccess, onError) => {
  const func = async tutor => {
    try {
      await fetchWithToken(`/api/member/tutors/`, getToken, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(tutor)
      });
      onSuccess();
    } catch (err) {
      onError(err);
    }
  };
  return func;
};

const buildUpdateTutor = (getToken, onSuccess, onError) => {
  const func = async (item, id) => {
    try {
      await fetchWithToken(`/api/member/tutors/${id}`, getToken, {
        method: "PUT",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(item)
      });
      onSuccess();
    } catch (err) {
      onError(err);
    }
  };
  return func;
};

const buildDeleteTutor = (getToken, onSuccess, onError) => {
  const func = async id => {
    try {
      await fetchWithToken(`/api/member/tutors/${id}`, getToken, {
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

const buildDeleteAllTutors = (getToken, onSuccess, onError) => {
  const func = async () => {
    try {
      await fetchWithToken(`/api/member/tutors`, getToken, {
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

const uploadTutorsCSV = (getToken, onSuccess, onError) => {
  const func = async  (file) => {
    const data = new FormData(); 
    data.append("csv", file); 
    try {
      await fetchWithToken('/api/member/tutors/upload', getToken, {
        method: "POST", 
        body: data
      });
      onSuccess(); 
    } catch (err) {
      onError(err); 
    }
  };
  return func; 
}

export { buildCreateTutor, buildDeleteTutor, buildUpdateTutor, buildDeleteAllTutors, uploadTutorsCSV};