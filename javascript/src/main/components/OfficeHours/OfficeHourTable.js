import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { Button } from "react-bootstrap";


export default ({officeHours,admin,deleteOfficeHour}) => {
    const renderDeleteButton = (id) => {
        return (
            <Button variant="danger" data-testid="delete-button" onClick={() => deleteOfficeHour(id)}>Delete</Button>
        )
    }

    function zoomRoomLinkFormatter(cell,row) {
    
        var httpsPrefix = 'https://';
        var linkWithHttps = httpsPrefix + cell
        return (
            <div><a rel={'external'} target="_blank" href={linkWithHttps}> { cell } </a></div>
        );
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
        dataField: 'zoomRoomLink',
        text: 'Zoom Room',
        formatter: zoomRoomLinkFormatter
    }, {
        dataField: 'notes',
        text: 'Notes'
    }, {
        dataField: 'tutorAssignment.id',
        text: 'Tutor Assignment'
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

    //call formatter function

    return (
        <BootstrapTable keyField='id' data={officeHours} columns={columns} />
    );
}
