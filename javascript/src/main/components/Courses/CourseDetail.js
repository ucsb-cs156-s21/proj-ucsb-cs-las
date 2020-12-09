import React from "react";
import { useParams } from "react-router-dom";
import TutorOfficeHourTable from "main/components/Courses/TutorOfficeHourTable"

export default ({Member,viewList}) => {
    const columns = [{
        dataField: 'id',
        text: 'tutor_assignment_id'
    }, {
        dataField: 'tutorAssignment.tutor.firstName',
        text: 'Tutor First Name'
    }, {
        dataField: 'tutorAssignment.tutor.lastName',
        text: 'Tutor Last Name'
    }, {
        dataField: 'dayOfWeek',
        text: 'Day of Week'
    }, {
        dataField: 'startTime',
        text: 'Start Time'
    }, {
        dataField: 'endTime',
        text: 'End Time'
    }];

    if (Member) {
        columns.push({
            text: "Email",
            dataField: "tutorAssignment.tutor.email",
        });
        columns.push({
            text: "Zoom Room Link",
            dataField: "zoomRoomLink",
        });
    }

    return (
        <BootstrapTable keyField='id' data={OnlineOfficeHours} columns={columns} />
    );
}