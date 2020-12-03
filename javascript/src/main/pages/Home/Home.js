import React from "react";
import { Jumbotron } from "react-bootstrap";
import CourseTable from "main/components/Courses/CourseTable"
import useSWR from "swr";
import { fetchWithoutToken } from "main/utils/fetch";
import { useHistory } from "react-router-dom";

const Home = () => {
    const { data: courses } = useSWR(
        "/api/public/courses",
        fetchWithoutToken
    );
    const { data: currentFilter } = useSWR(
        "api/public/filter", fetchWithoutToken
    );


    return (
        <Jumbotron>s
            <div className="text-left">

                <h5>Welcome to the UCSB CS LAs App!</h5>
                {currentFilter && currentFilter.length > 0 ? <h5> currently Filtering by Quarter {currentFilter[0].activeQuarter}</h5> :
                    <h5>No current quarter filter set</h5>}
                <CourseTable courses={courses || []} />
            </div>
        </Jumbotron>
    );
};

export default Home;
