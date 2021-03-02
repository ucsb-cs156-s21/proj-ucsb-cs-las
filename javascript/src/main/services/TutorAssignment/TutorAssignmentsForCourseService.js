import fetch from "isomorphic-unfetch";

const fetchTutorAssignmentsForCourse = async (course_id) => {
    const url = `/api/public/tutorAssignment/forCourse/${course_id}`;
    const apiResponse = await fetch(url);
 
    if (apiResponse.ok)
        return apiResponse.json();
    const message = 
        `getting ${apiResponse.url}, status=${apiResponse.status}`;
    throw new Error(message);
}

export { fetchTutorAssignmentsForCourse };