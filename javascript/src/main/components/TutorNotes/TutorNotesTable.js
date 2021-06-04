import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { Button } from "react-bootstrap";
import {asHumanQuarter} from "main/utils/quarter.ts";

export default ({tutorNotes, isInstructor, deleteTutorNotes}) => {
    console.log("tutorNotes",tutorNotes);

    const renderDeleteButton = (id) => {
        return (
            <Button variant="danger" data-testid={`delete-button-${id}`} onClick={() => deleteTutorNotes(id)}>Delete</Button>
        )
    }

    const renderTutorName = (row) => row?.onlineOfficeHours?.tutorAssignment?.tutor?.firstName + " " +row.onlineOfficeHours?.tutorAssignment?.tutor?.lastName;
    const renderCourseNameYear = (row) => {
        const quarter = row?.onlineOfficeHours?.tutorAssignment?.course?.quarter;
        return row?.onlineOfficeHours?.tutorAssignment?.course?.name + " " + asHumanQuarter(quarter);
    }

    const columns = [{
        dataField: 'id',
        text: 'id',
        sort: true
    }, {
        dataField: 'courseNameYear',
        text: 'Course',
        sort: true,
        formatter: (_cell, row) => renderCourseNameYear(row),
    }, {
        dataField: 'tutorName',
        text: 'Tutor',
        sort: true,
        formatter: (_cell, row) => renderTutorName(row),
    }, {
        dataField: 'message',
        text: 'message',
        sort: true,
    }];

    if (isInstructor) {
        columns.push({
            text: "Delete",
            isDummyField: true,
            dataField: "delete",
            formatter: (_cell, row) => renderDeleteButton(row.id)
        });
    }

    console.log("tutorNotes",tutorNotes);
    if (tutorNotes === null) {
        return (
            <div testid={"empty-TutorNotesTable"}></div>
        );
    }
    return (
      <BootstrapTable bootstrap4={true} keyField='id' data={tutorNotes} columns={columns} />
    );
}