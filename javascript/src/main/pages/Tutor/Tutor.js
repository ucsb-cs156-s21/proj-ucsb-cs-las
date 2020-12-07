import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { TutorAssignmentRepository } from "./src/main/java/edu/ucsb/ucsbcslas/repositories/TutorAssignmentRepository";
import { useHistory } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';


const Tutor = () => {

    const TutorList = TutorAssignmentRepository.findByCourse(this.course);
    const { user, getAccessTokenSilently: getToken } = useAuth0();
    const { name, picture, email } = user;
    const { data: roleInfo } = useSWR(
        ["/api/myRole", getToken],
        fetchWithToken
    );
    
    const printTutorListForLoggedInUser = () => 
    {
        for (let i = 0; i < TutorList.length; i++) 
        {
            temp += "<tr>";
            temp += "<th>";
            temp += TutorList[i].getFirstName();
            temp +- "</th>";
            temp += "<th>";
            temp += TutorList[i].getLastName();
            temp += "</th>";
            temp += "<th>";
            temp += TutorList[i].getEmail();
            temp += "</th>";
            temp += "</tr>";
        }
    }

    const printTutorListForNonLoggedInUser = () => 
    {
        for (let i = 0; i < TutorList.length; i++) 
        {
            temp += "<tr>";
            temp += "<th>";
            temp += TutorList[i].getFirstName();
            temp +- "</th>";
            temp += "<th>";
            temp += TutorList[i].getLastName();
            temp += "</th>";
            temp += "</tr>";
        }
    }
    
    const printTutorList = () => 
    {
        if (user) {
            printTutorListForLoggedInUser();
        }
        printTutorListForNonLoggedInUser();
    }

    return (
        < >
            <h1> Tutors </h1>
            <h2 style={{ display: 'flex', justifyContent: 'left' }}>All Tutors</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {printTutorList()}
                </tbody>
            </Table>

        </ >
    );
}