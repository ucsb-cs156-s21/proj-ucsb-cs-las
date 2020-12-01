import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default ({courses, instructor}) => {
    const history = useHistory();

    const renderEditButton = (id) => {
        return (
            <Button data-testid="edit-button" >Edit</Button>
        )
    }

    const renderDeleteButton = (id) => {
        return (
            <Button variant="danger" data-testid="delete-button" >Delete</Button>
        )
    }

    const columns = [{
        dataField: 'id',
        text: 'id'
    }, {
        dataField: 'name',
        text: 'Course Number'
    }, {
        dataField: 'quarter',
        text: 'Quarter'
    }, {
        dataField: 'instructorFirstName',
        text: 'First'
    }, {
        dataField: 'instructorLastName',
        text: 'Last'
    }, {
        dataField: 'instructorEmail',
        text: 'Email'
    }];

    if (instructor) {
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
        <BootstrapTable keyField='id' data={courses} columns={columns} />
    );
}