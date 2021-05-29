import React from "react";
import { FormControl,Row,Col } from "react-bootstrap";
import {asHumanQuarter} from "main/utils/quarter.ts"


export default function TutorAssignmentDisplay({tutorAssignment}) {
    console.log("tutorAssignment=",tutorAssignment)
    return (
        <Row>
            <Col>
                <FormControl readOnly type="text" value={tutorAssignment.tutor == null ? "" : tutorAssignment.tutor.firstName + ' ' + tutorAssignment.tutor.lastName }/>
            </Col>
            <Col>
                <FormControl readOnly type="text" value={ tutorAssignment.course == null ? "" : tutorAssignment.course.name }/>
            </Col>
            <Col>
                <FormControl readOnly type="text" value={ tutorAssignment.course == null ? "" : asHumanQuarter(tutorAssignment.course.quarter) }/>
            </Col>
        </Row>
    );
}
