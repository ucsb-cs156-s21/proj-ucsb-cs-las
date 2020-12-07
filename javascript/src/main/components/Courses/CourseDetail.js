import React from "react";
import { useParams } from "react-router-dom";
import TutorOfficeHourTable from "main/components/Courses/TutorOfficeHourTable"

function CourseDetail({courseId}) {
    return (
      <div>
        <p>This is the course detail page {courseId}.</p>


        if (courseId == OnlineOfficeHours.tutorAssignment.course.id)
            <TutorOfficeHourTable OnlineOfficeHours={TutorOfficeHourTable} />
      </div>
    );
}

export default CourseDetail;