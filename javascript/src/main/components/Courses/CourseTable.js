import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { buildDeleteCourse } from "main/services/Courses/CourseService";


export default ({courses,admin,deleteCourse}) => {
    const history = useHistory();

    const renderEditButton = (id) => {
        return (
            <Button data-testid="edit-button" onClick={() => { history.push(`/courses/edit/${id}`) }}>Edit</Button>
        )
    }

    const renderDeleteButton = (id) => {
        return (
            <Button variant="danger" data-testid="delete-button" onClick={() => deleteCourse(id)}>Delete</Button>
        )
    }

    const cellFormatter = (id, name) => {
        return (
            <div><a href="/course/{id}">{name}</a></div>
        );
    }

    // {cell+"/"+row.age}>{courses.getId()}
    // const columns = [{
    //     dataField: 'id',
    //     text: 'id'
    // }, {
    //     dataField: 'name',
    //     text: 'Course Number'
    // }, {
    //     dataField: 'quarter',
    //     text: 'Quarter'
    // }, {
    //     dataField: 'instructorFirstName',
    //     text: 'First'
    // }, {
    //     dataField: 'instructorLastName',
    //     text: 'Last'
    // }, {
    //     dataField: 'instructorEmail',
    //     text: 'Email'
    // }];

    const columns = [{
        dataField: 'id',
        text: 'id'
    }, {
        dataField: 'name',
        text: 'Course Number',
        formatter: (cell, row) => cellFormatter(row.id, row.name)
    }, {
        dataField: 'quarter',
        text: 'Quarter'
    }];

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
        <BootstrapTable keyField='id' data={courses} columns={columns} />
    );
}