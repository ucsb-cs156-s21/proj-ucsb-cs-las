import React from "react";
import { useParams } from "react-router-dom";

function CourseDetail({courseId}) {
    return (
      <div>
        <p>This is the course detail page {courseId}.</p>
      </div>
    );
}

export default CourseDetail;