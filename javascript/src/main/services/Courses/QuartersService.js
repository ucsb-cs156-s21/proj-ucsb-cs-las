import fetch from "isomorphic-unfetch";

const fetchQuarters = async () => {
    const url = '/api/public/quarters';
    const apiResponse = await fetch(url);
 
    if (apiResponse.ok)
        return apiResponse.json();
    const message = 
        `getting ${apiResponse.url}, status=${apiResponse.status}`;
    throw new Error(message);
}

export { fetchQuarters };