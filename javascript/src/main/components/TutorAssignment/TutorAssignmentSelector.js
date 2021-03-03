import React from "react";
import SelectQuarter from "main/components/TutorAssignment/SelectQuarter";
import SelectCourse from "main/components/TutorAssignment/SelectCourse";
import SelectTutorAssignment from "main/components/TutorAssignment/SelectTutorAssignment";

export const emptyTA = {
    tutor: {
        firstName: "",
        lastName: ""
    },
    assignmentType: ""
};

export default (
    {
        fetchers,
        quarters, 
        setQuarter,
        courses, setCourses,
        courseIndex, setCourseIndex,
        taIndex, setTaIndex, 
        tutorAssignments, setTutorAssignments
    }
) => {

    const updateQuarter = async (quarter) => {
          const coursesForQuarter = await fetchers.getCoursesForQuarter(quarter)
          const courses = [{ quarter: "" }, ...coursesForQuarter]
          setQuarter(quarter);
          setCourses(courses);
          setTutorAssignments([emptyTA])
          setCourseIndex(0);
          setTaIndex(0);
        }
      
        const updateCourseIndex = async (courseIndex) => {
          const tasForCourse = await fetchers.getTAsForCourse(courses[courseIndex].id);
          const taAssignments = [emptyTA, ...tasForCourse]
          setCourseIndex(courseIndex);
          setTutorAssignments(taAssignments);
          setTaIndex(0);
        }

    return (
        <>
            <SelectQuarter quarters={quarters} setQuarter={updateQuarter}  />
            <SelectCourse courseIndex={courseIndex} setCourseIndex={updateCourseIndex} courses={courses}  />  
            <SelectTutorAssignment taIndex={taIndex} setTaIndex={setTaIndex} tutorAssignments={tutorAssignments}  />    
        </>
    );
};

