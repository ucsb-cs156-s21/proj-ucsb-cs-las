import React from "react";
import SelectQuarter from "main/components/TutorAssignment/SelectQuarter";
import SelectCourse from "main/components/TutorAssignment/SelectCourse";
import SelectTutorAssignment from "main/components/TutorAssignment/SelectTutorAssignment";

export default (
    {
        quarters, quarter, setQuarter,
        courses, setCourses,
        courseIndex, setCourseIndex
    }
) => {

    return (
        <>
            <SelectQuarter quarters={quarters} setQuarter={setQuarter} quarter={quarter} />
            <SelectCourse courseIndex={courseIndex} setCourseIndex={setCourseIndex} courses={courses}  />    
        </>
    );
};

