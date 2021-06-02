import React from "react";
import { Jumbotron } from "react-bootstrap";
import CourseList from "main/components/Courses/CourseList"
import useSWR from "swr";
import { fetchWithoutToken } from "main/utils/fetch";
import fromFormat from "main/utils/FromFormat";

const Home = () => {
    const { data: courses } = useSWR(
        "/api/public/courses/",
        fetchWithoutToken
    );

    const { data: currentFilter } = useSWR(
        "api/public/filter", fetchWithoutToken
    );

    const filterLabel = (currentFilter) =>{
        if(currentFilter && currentFilter.length > 0){
            if(currentFilter[0].activeQuarter !=="All"){
                return <h5>Currently filtering by quarter {fromFormat(currentFilter[0].activeQuarter)}</h5>
            }
        }
        return <h5>All quarters are being viewed</h5>
    };

    return (
        <Jumbotron>
            <div className="text-left">

                <h5>Welcome to the UCSB CS LAs App!</h5>
                {filterLabel(currentFilter)}
                <CourseList courses={courses || []} />
            </div>
        </Jumbotron>
    );
};

export default Home;