import { fetchWithToken } from "main/utils/fetch";

const buildCreateCourse = (getToken, onSuccess, onError) => {
  const func = async (name, quarter, instructorFirstName, instructorLastName, instructorEmail) => {
    try {
      await fetchWithToken(`/api/admin/courses/`, getToken, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          quarter,
          instructorFirstName,
          instructorLastName,
          instructorEmail,
        }),
      });
      onSuccess();
    } catch (err) {
      onError(err);
    }
  };
  return func
}

const buildUpdateCourse = (getToken, onSuccess, onError) => {
  const func = async (item, id) => {
    try {
      await fetchWithToken(`/api/admin/courses/${id}`, getToken, {
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

const buildDeleteCourse = (getToken, onSuccess, onError) => {
  const func = async (id) => {
    try {
      await fetchWithToken(`/api/admin/courses/${id}`, getToken, {
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



export { buildCreateCourse, buildDeleteCourse, buildUpdateCourse };