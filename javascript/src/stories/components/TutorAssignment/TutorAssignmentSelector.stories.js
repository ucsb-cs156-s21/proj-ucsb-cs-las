import React, { useState } from 'react';

import TutorAssignmentSelector from "main/components/TutorAssignment/TutorAssignmentSelector";

import * as tutorAssignmentFixtures from "main/fixtures/tutorAssignmentFixtures"

import { emptyTA } from "main/components/TutorAssignment/TutorAssignmentSelector";


export default {
  title: 'components/TutorAssignments/TutorAssignmentSelector',
  component: TutorAssignmentSelector
};

const Template = (args) => {
  const [_quarter, setQuarter] = useState("");
  const [courseIndex, setCourseIndex] = useState(0);
  const [courses, setCourses] = useState([{ quarter: "" }]);
  const [taIndex, setTaIndex] = useState(0);
  const [tutorAssignments, setTutorAssignments] = useState([emptyTA]);

  const quarters=tutorAssignmentFixtures.fetchersFromFixtures.getQuarters();

  return (
    <TutorAssignmentSelector
    fetchers={tutorAssignmentFixtures.fetchersFromFixtures}
    quarters={quarters}
    setQuarter={setQuarter}
    courses={courses} setCourses={setCourses}
    courseIndex={courseIndex} setCourseIndex={setCourseIndex}
    taIndex={taIndex} setTaIndex={setTaIndex} 
    tutorAssignments={tutorAssignments} setTutorAssignments={setTutorAssignments}
      {...args}
    />
  )
};


export const ManyQuartersTAS = Template.bind({});
ManyQuartersTAS.args = {
  quarters: tutorAssignmentFixtures.fetchersFromFixtures.getQuarters()
};
