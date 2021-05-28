import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';


export default ({upcomingOfficeHours}) => {

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
   
    const columns = [{
        dataField: 'id',
        text: 'id'
    }, {
        dataField: 'startTime',
        text: 'Start Time'
    }, {
        dataField: 'endTime',
        text: 'End Time'
    }, {
        dataField: 'dayOfWeek',
        text: 'Day'
    }, {
        dataField: 'tutorName',
        text: 'Tutor',
        formatter: (_cell, row) => renderTutorName(row),
        sortValue: (_cell, row) => renderTutorName(row)
    }, {
        dataField: 'tutorID',
        text: 'Tutor Assignment'
    }, {
        dataField: 'courseNameYear',
        text: 'Course',
        formatter: (_cell, row) => renderCourseNameYear(row),
        sortValue: (_cell, row) => renderCourseNameYear(row)
    },
    ];

    if (admin) {
        columns.push({
                dataField: 'email',
                text: 'email'
            }, {
                dataField: 'zoomRoomLink',
                text: 'Zoom Room',
                formatter: zoomRoomLinkFormatter
            }
        );
    }

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
