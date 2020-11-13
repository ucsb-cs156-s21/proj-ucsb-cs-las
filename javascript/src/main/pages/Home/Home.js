import React from "react";
import { Jumbotron } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
// import { Redirect } from "react-router-dom";
import CourseTable from "../../components/Courses/CourseTable"
import useSWR from "swr";
import { fetchWithoutToken } from "main/utils/fetch";

// const courses = [{ "id": 1, "name": "CMPSC 156", "quarter": "F20", "instructorFirstName": "Phill", "instructorLastName": "Conrad", "instructorEmail": "phtcon@ucsb.edu" }];

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
