import React from "react";
import { Jumbotron } from "react-bootstrap";
import {useAuth0} from "@auth0/auth0-react";
import { Redirect } from "react-router-dom";
import CourseTable from "../../components/Courses/CourseTable"

const Home = () => {
    const { isAuthenticated } = useAuth0();

    return (
            <Jumbotron>
                <div className="text-left">
                    <h5>Welcome to the UCSB CS LAs App!</h5>
                    <CourseTable />
                </div>
            </Jumbotron>
    );
};

export default Home;
