import { fetchWithToken } from "main/utils/fetch";

const buildCreateCourse = (getToken, onSuccess, onError) => {
  const func = async (course) => {
    try {
      const result = await fetchWithToken(`/api/admin/courses/`, getToken, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(course),
      });
      onSuccess(result);
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

const uploadCoursesCSV = (getToken, onSuccess, onError) =>{
  const func = async (file) => {
      const data = new FormData();
      data.append("csv", file);
      try{
          await fetchWithToken(`/api/courses/upload`, getToken, {
              method: "POST",
              body: data
          });
          onSuccess();
      } catch (err){
          onError(err);
      }
  };
  return func;
}

export { uploadCoursesCSV, buildCreateCourse, buildDeleteCourse, buildUpdateCourse };