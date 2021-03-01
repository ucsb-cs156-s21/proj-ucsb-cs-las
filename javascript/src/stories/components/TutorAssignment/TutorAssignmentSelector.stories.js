import React, { useState } from 'react';

import TutorAssignmentSelector from "main/components/TutorAssignment/TutorAssignmentSelector";

import * as courseFixtures from "main/fixtures/courseFixtures.js"
import * as tutorAssignmentFixtures from "main/fixtures/tutorAssignmentFixtures.js"

export default {
  title: 'components/TutorAssignments/TutorAssignmentSelector',
  component: TutorAssignmentSelector
};


const Template = (args) => {
    const [quarter, setQuarter] = useState("");
    const [courseIndex, setCourseIndex] = useState(0);
    const [courses, setCourses] = useState([{quarter: ""}]);
    const [taIndex, setTaIndex] = useState(0);
    const [tutorAssignments, setTutorAssignments] = useState([tutorAssignmentFixtures.emptyTA]);

    const getCoursesForQuarter =  (quarter) => {
      if (! (quarter in courseFixtures.quarterToCourses) )
        return [ { quarter: "" } ]
      const coursesForQuarter = courseFixtures.quarterToCourses[quarter];
      return [  { quarter: "" }, ...coursesForQuarter]
    }

    const getTAsForCourse =  (courseId) => {
      if (! (courseId in tutorAssignmentFixtures.courseId_to_tutorAssignments) )
        return [ tutorAssignmentFixtures.emptyTA ]
      const tasForCourse = tutorAssignmentFixtures.courseId_to_tutorAssignments[courseId];
      return [ tutorAssignmentFixtures.emptyTA, ...tasForCourse]
    }

    const updateQuarter =  (quarter) => {
      console.log("Update quarter",quarter);
      const courses = getCoursesForQuarter (quarter)
      setQuarter(quarter);
      setCourses(courses);
      setTutorAssignments([ tutorAssignmentFixtures.emptyTA] )
      setCourseIndex(0);
      setTaIndex(0);
      console.log(`quarter=${quarter} courseIndex=${courseIndex} courses=`,courses);
    }

    const updateCourseIndex =  (courseIndex) => {
      console.log("Update course, courseIndex=", courseIndex);
      const taAssignments = getTAsForCourse (courses[courseIndex].id);
      setCourseIndex(courseIndex);
      setTutorAssignments(taAssignments);
      setTaIndex(0);      
    }

    console.log(`courses=`,courses);
    return (
      <TutorAssignmentSelector 
      setQuarter={updateQuarter} quarter={quarter} 
      setCourseIndex={updateCourseIndex} courseIndex={courseIndex}
      setCourses={setCourses} courses = {courses}
      setTaIndex={setTaIndex} taIndex={taIndex}
      setTutorAssignments={setTutorAssignments} tutorAssignments = {tutorAssignments}
      {...args}
     />
    )
  };
  

  export const ManyQuartersTAS = Template.bind({});
  ManyQuartersTAS.args = {
      quarters: Object.keys(courseFixtures.quarterToCourses)
  };
  