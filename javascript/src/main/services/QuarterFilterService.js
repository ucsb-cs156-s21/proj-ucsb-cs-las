import { fetchWithToken } from "main/utils/fetch";
import { checkCourseQuarter } from "main/utils/CourseFormHelpers";

const buildUpsertFilter = (getToken, onSuccess, onError) => {
  const func = async (quarterString) => {
    var isValid = quarterString === '' || false;

    if (quarterString) {
      isValid = checkCourseQuarter(quarterString);
    }

    try {
      if (isValid || typeof quarterString === 'undefined') {
        await fetchWithToken(`/api/admin/filter/${quarterString}`, getToken, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
        });
        onSuccess();
      } else {
        onError('Invalid quarter string');
      }
    } catch (e) {
      onError('Invalid quarter string');
    }

  };

  return func
}


export {buildUpsertFilter};