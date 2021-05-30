import { fetchWithoutToken } from "main/utils/fetch";

const quarterProvider = () => fetchWithoutToken("/api/public/quarters");
const courseProvider = quarter => fetchWithoutToken(`/api/public/courses/forQuarter/${quarter}`);
const tutorAssignmentProvider = course => fetchWithoutToken(`/api/public/tutorAssignment/${course}`);

export {quarterProvider, courseProvider, tutorAssignmentProvider };