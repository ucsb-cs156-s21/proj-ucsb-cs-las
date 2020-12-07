import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";


export default ({officeHours,admin,deleteOfficeHour,editOfficeHour}) => {
    const history = useHistory();

     const renderEditButton = (id) => {
      return (
             <Button data-testid="edit-button" onClick={() => { history.push(`/courses/edit/${id}`) }}>Edit</Button>
         )
     }

    const renderDeleteButton = (id) => {
        return (
            <Button variant="danger" data-testid="delete-button" onClick={() => deleteOfficeHour(id)}>Delete</Button>
        )
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
        text: 'Zoom Room'
    }, {
        dataField: 'notes',
        text: 'Notes'
    }

    ];

    if (admin) {
         columns.push({
             text: "Edit",
             isDummyField: true,
             dataField: "edit",
             formatter: (cell, row) => renderEditButton(row.id)
         });
        columns.push({
            text: "Delete",
            isDummyField: true,
            dataField: "delete",
            formatter: (cell, row) => renderDeleteButton(row.id)
        });
    }

    return (
        <BootstrapTable keyField='id' data={officeHours} columns={columns} />
    );
}
