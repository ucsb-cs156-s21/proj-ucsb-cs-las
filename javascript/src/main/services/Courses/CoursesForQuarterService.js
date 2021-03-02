import fetch from "isomorphic-unfetch";

const fetchCoursesForQuarter = async (quarter) => {
    const url = `/api/public/courses/forQuarter/${quarter}`;
    const apiResponse = await fetch(url);
 
    if (apiResponse.ok)
        return apiResponse.json();
    const message = 
        `getting ${apiResponse.url}, status=${apiResponse.status}`;
    throw new Error(message);
}

export { fetchCoursesForQuarter };