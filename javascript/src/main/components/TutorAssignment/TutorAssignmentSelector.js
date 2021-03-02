import React from "react";
import SelectQuarter from "main/components/TutorAssignment/SelectQuarter";
import SelectCourse from "main/components/TutorAssignment/SelectCourse";
import SelectTutorAssignment from "main/components/TutorAssignment/SelectTutorAssignment";
import * as tutorAssignmentFixtures from "main/fixtures/tutorAssignmentFixtures"

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
        quarter, setQuarter,
        courses, setCourses,
        courseIndex, setCourseIndex,
        taIndex, setTaIndex, 
        tutorAssignments, setTutorAssignments
    }
) => {

    const updateQuarter = async (quarter) => {
          console.log("Update quarter", quarter);
          const courses = await fetchers.getCoursesForQuarter(quarter)
          setQuarter(quarter);
          setCourses(courses);
          setTutorAssignments([emptyTA])
          setCourseIndex(0);
          setTaIndex(0);
          console.log(`quarter=${quarter} courseIndex=${courseIndex} courses=`, courses);
        }
      
        const updateCourseIndex = async (courseIndex) => {
          console.log("Update course, courseIndex=", courseIndex);
          const taAssignments = await fetchers.getTAsForCourse(courses[courseIndex].id);
          setCourseIndex(courseIndex);
          setTutorAssignments(taAssignments);
          setTaIndex(0);
        }

    return (
        <>
            <SelectQuarter quarters={quarters} setQuarter={updateQuarter} quarter={quarter} />
            <SelectCourse courseIndex={courseIndex} setCourseIndex={updateCourseIndex} courses={courses}  />  
            <SelectTutorAssignment taIndex={taIndex} setTaIndex={setTaIndex} tutorAssignments={tutorAssignments}  />    
        </>
    );
};

