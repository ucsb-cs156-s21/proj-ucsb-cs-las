import React from "react";
import useSWR from "swr";
import { fetchWithToken } from "main/utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";
import {asHumanQuarter} from "main/utils/quarter.ts"
import BootstrapTable from 'react-bootstrap-table-next';


export default ({upcomingOfficeHours}) => {
    const { user, getAccessTokenSilently: getToken } = useAuth0();
    const { email } = () => {
        return user;
    };

    function zoomRoomLinkFormatter(cell) {
        return (
            <div><a target="_blank" rel = "noopener noreferrer" href={cell}> { cell } </a></div>
        );
    }

    const renderTutorName = (row) => row.tutor.firstName + " " + row.tutor.lastName;
    const renderCourseNameYear = (row) => {
        const quarter = row.course.quarter;
        return row.course.name + " " + asHumanQuarter(quarter);
    }
    const renderEmail = (row) => row.tutor.email;
  
    const { data: roleInfo } = useSWR(
        ["/api/myRole", getToken],
        fetchWithToken
    );
    const { data: memberList } = useSWR(
        [`/api/member/courses/forInstructor/${email}`, getToken],
        fetchWithToken
      );
    const isMember = roleInfo && roleInfo.role && memberList && (memberList.length > 0 || roleInfo.role.toLowerCase() !== "guest" || roleInfo.role.toLowerCase() === "admin" || roleInfo.role.toLowerCase() === "member");
   
    const columns = [{
        dataField: 'id',
        text: 'id'
    }, {
        dataField: 'dayOfWeek',
        text: 'Day'
    }, {
        dataField: 'startTime',
        text: 'Start Time'
    }, {
        dataField: 'endTime',
        text: 'End Time'
    }, {
        dataField: 'tutorName',
        text: 'Tutor',
        formatter: (_cell, row) => renderTutorName(row),
        sortValue: (_cell, row) => renderTutorName(row)
    }, {
        dataField: 'courseNameYear',
        text: 'Course',
        formatter: (_cell, row) => renderCourseNameYear(row),
        sortValue: (_cell, row) => renderCourseNameYear(row)
    }, {
        dataField: 'email',
        text: 'email',
        hidden: isMember,
        formatter: (_cell, row) => renderEmail(row),
        sortValue: (_cell, row) => renderEmail(row)
    }, {
        dataField: 'zoomRoomLink',
        text: 'Zoom Room',
        hidden: isMember,
        formatter: zoomRoomLinkFormatter
    },
    ];

    /*if (isMember) {
        columns.push({
                dataField: 'email',
                text: 'email',
                formatter: (_cell, row) => renderEmail(row),
                sortValue: (_cell, row) => renderEmail(row)
            }, {
                dataField: 'zoomRoomLink',
                text: 'Zoom Room',
                formatter: zoomRoomLinkFormatter
            }
        );
    }*/

    return (
        <BootstrapTable 
            bootstrap4={true}
            keyField='id' 
            data={upcomingOfficeHours} 
            columns={columns} 
            striped 
        />
    );
}
