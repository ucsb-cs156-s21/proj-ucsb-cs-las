import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { Button } from "react-bootstrap";
import {asHumanQuarter} from "main/utils/quarter.ts"
import { useHistory } from "react-router-dom";

export default ({tutorAssignments, isInstructor}) => {
    const history = useHistory();

    const renderEditButton = (id) => {
        return (
            <Button data-testid={"edit-button-"+id} onClick={() => {history.push(`/tutorAssignments/edit/${id}`) }}>Edit</Button>
        )
    }

    const renderDeleteButton = (_id) => {
        return (
            <Button variant="danger" data-testid="delete-button" >Delete</Button>
        )
    }

    const renderTutorName = (row) => row.tutor.firstName + " " +row.tutor.lastName;
    const renderCourseNameYear = (row) => {
        const quarter = row.course.quarter;
        return row.course.name + " " + asHumanQuarter(quarter);
    }

    const sortCaret = (order, _column) => {

        const ascendingON = String.fromCharCode(0x25b2);
        const descendingON = String.fromCharCode(0x25bc);
        const ascendingOFF = String.fromCharCode(0x25b3);
        const descendingOFF = String.fromCharCode(0x25bd);

        if (!order)
            return (<span data-testid="sort">{descendingOFF}{ascendingOFF}</span>);
        else if (order === 'asc')
            return (<span data-testid="sort-asc">{descendingOFF}<font color="red">{ascendingON}</font></span>);
        else
            return (<span data-testid="sort-desc"><font color="red">{descendingON}</font>{ascendingOFF}</span>);

    }

    const columns = [{
        dataField: 'id',
        text: 'id',
        sort: true,
        sortCaret: sortCaret
    }, {
        dataField: 'courseNameYear',
        text: 'Course',
        sort: true,
        sortCaret: sortCaret,
        formatter: (_cell, row) => renderCourseNameYear(row),
        sortValue: (_cell, row) => renderCourseNameYear(row)
    
    }, {
        dataField: 'tutorName',
        //isDummyField: true,
        text: 'Tutor',
        sort: true,
        sortCaret: sortCaret,
        formatter: (_cell, row) => renderTutorName(row),
        sortValue: (_cell, row) => renderTutorName(row)
    }, {
        dataField: 'assignmentType',
        text: 'Assignment Type',
        sort: true,
        sortCaret: sortCaret
    }];

    if (isInstructor) {
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
        <BootstrapTable keyField='id' data={tutorAssignments} columns={columns} />
    );
}
