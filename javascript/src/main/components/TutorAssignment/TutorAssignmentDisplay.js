import React from "react";

export default function TutorAssignmentDisplay({tutorAssignment}) {
    console.log("tutorAssignment=",tutorAssignment)
    return (
        <>
        <div>{tutorAssignment.tutor.firstName} {tutorAssignment.tutor.lastName} {tutorAssignment.course.name} {tutorAssignment.course.quarter}</div>
        </>
    )
}
