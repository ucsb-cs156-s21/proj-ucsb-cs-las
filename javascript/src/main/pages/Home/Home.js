import React from "react";
import { Jumbotron } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import CourseList from "main/components/Courses/CourseList";
import { fetchWithToken } from "main/utils/fetch";
import UpcomingOfficeHourTable from "main/components/OfficeHours/UpcomingOfficeHourTable";
import useSWR from "swr";
import Loading from "main/components/Loading/Loading";
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
    const { getAccessTokenSilently: getToken } = useAuth0();
    const { data: officeHourList, error, mutate: mutateOfficeHours } = useSWR(
        ["/api/public/officeHours", getToken],
        fetchWithToken
    );
    if (error) {
        return (
        <h1>We encountered an error; please reload the page and try again.</h1>
        );
    }
    if (!officeHourList) {
        return <Loading />;
    }

    return (
        <Jumbotron>
            <div className="text-left">

                <h5>Welcome to the UCSB CS LAs App!</h5>
                {filterLabel(currentFilter)}
                <CourseList courses={courses || []} />
            </div>
        </Jumbotron>,
        <UpcomingOfficeHourTable officeHours={officeHourList}/>
    );
};

export default Home;