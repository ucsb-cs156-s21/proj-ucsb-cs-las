import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { Button } from "react-bootstrap";


export default ({officeHours,admin,deleteOfficeHour}) => {
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
   
    const columns = [{
        dataField: 'id',
        text: 'id',
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
    }, {
        dataField: 'tutorAssignment.id',
        text: 'Tutor Assignment',
        sort: true
    }
    ];

    if (admin) {
        columns.push({
            text: "Delete",
            isDummyField: true,
            dataField: "delete",
            formatter: (_cell, row) => renderDeleteButton(row.id)
        });
    }

    return (
        <BootstrapTable 
        bootstrap4=true,
        keyField='id' 
        data={officeHours} 
        columns={columns} 
        striped 
        />
    );
}
