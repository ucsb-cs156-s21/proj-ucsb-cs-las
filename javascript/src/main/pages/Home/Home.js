import React from "react";
import { Jumbotron } from "react-bootstrap";
import CourseTable from "main/components/Courses/CourseTable"
import useSWR from "swr";
import { fetchWithoutToken } from "main/utils/fetch";

const Home = () => {
    const { data: courses } = useSWR(
        "/api/public/courses",
        fetchWithoutToken
    );

    return (
        <Jumbotron>
            <div className="text-left">
                <h5>Welcome to the UCSB CS LAs App!</h5>
                <CourseTable courses={courses || []} />  
            </div>
        </Jumbotron>
    );
};

export default Home;
