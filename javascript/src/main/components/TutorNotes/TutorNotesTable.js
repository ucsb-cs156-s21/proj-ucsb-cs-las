import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { Button } from "react-bootstrap";
import {asHumanQuarter} from "main/utils/quarter.ts"
import { useHistory } from "react-router-dom";
import { Null } from "../../../stories/components/TutorNotes/TutorNotesTable.stories";

export default ({tutorNotes, isInstructor}) => {
    const history = useHistory();
    console.log("tutorNotes",tutorNotes);

    const renderDeleteButton = (_id) => {
        return (
            <Button variant="danger" data-testid="delete-button" >Delete</Button>
        )
    }

    const renderTutorName = (row) => row?.onlineOfficeHours?.tutor?.firstName + " " +row.onlineOfficeHours?.tutor?.lastName;
    const renderCourseNameYear = (row) => {
        const quarter = row?.onlineOfficeHours?.course?.quarter;
        console.log("courseTable quarter: ", quarter)
        if (quarter){
            return row?.onlineOfficeHours?.course?.name + " " + asHumanQuarter(quarter);
        }
        return null;
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
        //sortValue: (_cell, row) => renderCourseNameYear(row)
    }, {
        dataField: 'tutorName',
        //isDummyField: true,
        text: 'Tutor',
        sort: true,
        formatter: (_cell, row) => renderTutorName(row),
        //sortValue: (_cell, row) => renderTutorName(row)
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