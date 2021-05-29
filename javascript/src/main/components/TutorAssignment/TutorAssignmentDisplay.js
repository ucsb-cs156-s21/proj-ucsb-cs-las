import React from "react";

export default function TutorAssignmentDisplay({tutorAssignment}) {
    console.log("tutorAssignment=",tutorAssignment)
    return (
        <>
        <div>{tutorAssignment.tutor == null ? "" : tutorAssignment.tutor.firstName} {tutorAssignment.tutor == null ? "" : tutorAssignment.tutor.lastName} {tutorAssignment.course == null ? "" : tutorAssignment.course.name} {tutorAssignment.course == null ? "" : tutorAssignment.course.quarter}</div>
        </>
    )
}
