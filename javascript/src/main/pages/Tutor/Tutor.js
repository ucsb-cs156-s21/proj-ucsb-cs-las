import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchWithToken } from "main/utils/fetch";
import { useSWR } from "swr";
import { useParams } from "react-router-dom";

const Tutor = () => {

    function CourseDetail({courseId}) {
        return (
          <div>
            <p>This is the course detail page {courseId}.</p>
          </div>
        );
    }    

    const { getAccessTokenSilently: getToken } = useAuth0();
    const { data: users } = useSWR(["/api/users", getToken], fetchWithToken);
 
    const { data: course } = useSWR(
        [`/api/public/courses/${courseId}`, getToken],
        fetchWithToken
    );

    const { data: tutorAssignments } = useSWR(
        [`/api/member/tutorAssignments/${course}`, getToken],
        fetchWithToken
    );
    
    const printTutorAssignmentsForLoggedInUser = () => 
    {
        for (let i = 0; i < tutorAssignments.length; i++) 
        {
            temp += "<tr>";
            temp += "<th>";
            temp += tutorAssignments[i].tutor();
            temp +- "</th>";
            temp += "<th>";
            temp += tutorAssignments[i].tutor.email();
            temp += "</th>";
            temp += "</tr>";
        }
        return temp;
    }

    const printTutorAssignmentsForNonLoggedInUser = () => 
    {
        for (let i = 0; i < tutorAssignments.length; i++) 
        {
            temp += "<tr>";
            temp += "<th>";
            temp += tutorAssignments[i].tutor();
            temp +- "</th>";
            temp += "<th>";
            temp += "Sign in to display tutor's email";
            temp += "</th>";
            temp += "</tr>";
        }
        return temp;
    }
    
    const printTutorAssignments = () => 
    {
        if (users) {
            return printTutorAssignmentsForLoggedInUser;
        }
        else {
            return printTutorAssignmentsForNonLoggedInUser;
        }
    }

    return (
        < >
            {courseDetail}
            <title> Tutors </title>

            <table border = "1" width = "100%">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {printTutorAssignments}
                </tbody>
            </table>

        </ >
    );
}

export default Tutor;