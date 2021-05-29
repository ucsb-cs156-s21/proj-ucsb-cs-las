import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";


export default ({officeHours,admin,deleteOfficeHour}) => {
    let history = useHistory();

    const renderEditButton = (id) => {
        return (
            <Button data-testid={"edit-button-"+id} onClick={() => {history.push(`/officeHours/edit/${id}`) }}>Edit</Button>
        )
    }

    const renderDeleteButton = (id) => {
        return (
            <Button variant="danger" data-testid="delete-button" onClick={() => deleteOfficeHour(id)}>Delete</Button>
        )
    }

    function zoomRoomLinkFormatter(cell) {
        return (
            <div><a target="_blank" rel = "noopener noreferrer" href={cell}> { cell } </a></div>
        );
    }

    const renderTutorName = (row) => row.tutorAssignment == null ? "" : row.tutorAssignment.tutor.firstName + " " +row.tutorAssignment.tutor.lastName;

    const columns = [{
        dataField: 'id',
        text: 'id',
        sort: true
    }, {
        dataField: 'tutorAssignment.id',
        text: 'Tutor Assignment',
        sort: true
    }, {
        dataField: 'tutorName',
        text: 'Tutor Name',
        sort: true,
        formatter: (_cell, row) => renderTutorName(row)
    }, {
        dataField: 'tutorAssignment.course.name',
        text: 'Course Name',
        sort: true
    }, {
        dataField: 'tutorAssignment.course.quarter',
        text: 'Quarter',
        sort: true
    }, {
        dataField: 'startTime',
        text: 'Start Time',
        sort: true
    }, {
        dataField: 'endTime',
        text: 'End Time',
        sort: true
    }, {
        dataField: 'dayOfWeek',
        text: 'Day',
        sort: true
    }, {
        dataField: 'zoomRoomLink',
        text: 'Zoom Room',
        formatter: zoomRoomLinkFormatter,
        sort: true
    }, {
        dataField: 'notes',
        text: 'Notes',
        sort: true
    }
    ];

    if (admin) {
        columns.push({
            text: "Edit",
            isDummyField: true,
            dataField: "edit",
            formatter: (_cell, row) => renderEditButton(row.id)
        });
        columns.push({
            text: "Delete",
            isDummyField: true,
            dataField: "delete",
            formatter: (_cell, row) => renderDeleteButton(row.id)
        });
    }

    return (
        <BootstrapTable 
            bootstrap4={true}
            keyField='id' 
            data={officeHours} 
            columns={columns} 
            striped 
        />
    );
}
