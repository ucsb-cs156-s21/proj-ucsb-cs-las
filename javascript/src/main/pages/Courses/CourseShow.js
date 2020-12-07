import React from "react";
import { useParams} from "react-router-dom";
import CourseDetail from "main/components/Courses/CourseDetail";


function CourseShow(){
    const {courseId} = useParams();
    return(
        <CourseDetail courseId={courseId} />
    )
}

export default CourseShow;
