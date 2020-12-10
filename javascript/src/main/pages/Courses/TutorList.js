import React from "react";
import useSWR from "swr";
import { fetchWithToken } from "main/utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "main/components/Loading/Loading";
import TutorTable from "main/components/Courses/TutorTable"
import { useParams } from "react-router-dom"

const Tutors = () => {
    
    const { courseId } = useParams(); 


    const { user, getAccessTokenSilently: getToken } = useAuth0();
    const { name, picture, email } = user;
    const { data: roleInfo } = useSWR(
    ["/api/myRole", getToken],
    fetchWithToken
    );
    const endpoint = roleInfo && roleInfo.role === "member" || roleInfo.role === "admin" ? "/api/member" : "/api/public/tutors/{courseId}";
    const { data: tutorList, error} = useSWR([endpoint, getToken], fetchWithToken); 

    if (error) {
        return (
          <h1>We encountered an error; please reload the page and try again.</h1>
        );
      }
    if (!viewList) {
        return <Loading />;
    }    
    return (
        <TutorTable tutorList = {tutorList} member = {roleInfo.role === "member" || roleInfo.role === "admin"}/>
    );
}