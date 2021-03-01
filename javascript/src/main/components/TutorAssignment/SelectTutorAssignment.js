import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { compareValues } from "main/utils/sortHelper";
import { asQyy } from "main/utils/quarter";

const briefTutorAssignmentInfo = (ta) => {
    if (ta && ta.id && ta.course && ta.course.name && ta.course.quarter && ta.tutor && ta.tutor.firstName && ta.tutor.lastName && ta.assignmentType)
        return `id: ${ta.id} ${ta.course.name} ${asQyy(ta.course.quarter)} ${ta.tutor.firstName} ${ta.tutor.lastName} ${ta.assignmentType}`
    else
        return "no tutor assignment selected"
}

const formatTutorAssignmentLabel = (tutorAssignment) => {
    try {
        const first = tutorAssignment.tutor.firstName;
        const last = tutorAssignment.tutor.lastName;
        const type = tutorAssignment.assignmentType;
        if (first || last || type)
            return first + " " + last + " (" + type + ")";
        else
            return ""
    } catch (err) {
        return "";
    }
}

export default ({ taIndex, setTaIndex, tutorAssignments }) => {

    const initialTaInfo = briefTutorAssignmentInfo(tutorAssignments[taIndex]);
    console.log("initialTaInfo=", initialTaInfo);

    const handleTaOnChange = (event) => {
        setTaIndex(event.target.value);
    };

    return (
        <Form.Group controlId="SelectTutor.Tutor">
            <Form.Label>Tutor</Form.Label>
            <Form.Control as="select" onChange={handleTaOnChange} value={taIndex}>
                {tutorAssignments.map((object, i) => {
                    return <option key={i} value={i}>{formatTutorAssignmentLabel(object)}</option>;
                })}
            </Form.Control>
            <Form.Text className="text-muted">
                {briefTutorAssignmentInfo(tutorAssignments[taIndex])}
            </Form.Text>
        </Form.Group>
    );
};

