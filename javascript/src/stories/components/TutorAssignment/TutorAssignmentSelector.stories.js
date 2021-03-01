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


    const getCoursesForQuarter =  (quarter) => {
      if (! (quarter in courseFixtures.quarterToCourses) )
        return [ { quarter: "" } ]
      const coursesForQuarter = courseFixtures.quarterToCourses[quarter];
      console.log("coursesForQuarter:",coursesForQuarter)
      return [  { quarter: "" }, ...coursesForQuarter]
    }

    const updateQuarter =  (quarter) => {
      console.log("Update quarter",quarter);
      const courses = getCoursesForQuarter (quarter)
      setQuarter(quarter);
      setCourses(courses);
      setCourseIndex(0);
      console.log(`quarter=${quarter} courseIndex=${courseIndex} courses=`,courses);
    }

    console.log(`courses=`,courses);
    return (
      <TutorAssignmentSelector 
      setQuarter={updateQuarter} quarter={quarter} 
      setCourseIndex={setCourseIndex} courseIndex={courseIndex}
      setCourses={setCourses} courses = {courses}
      {...args}
     />
    )
  };
  

  export const ManyQuartersTAS = Template.bind({});
  ManyQuartersTAS.args = {
      quarters: Object.keys(courseFixtures.quarterToCourses)
  };
  