import React, { useState } from 'react';
import SelectTutorAssignment from "main/components/TutorAssignment/SelectTutorAssignment";
import * as tutorAssignmentFixtures from "main/fixtures/tutorAssignmentFixtures.js"
import { emptyTA } from "main/components/TutorAssignment/TutorAssignmentSelector";

export default {
  title: 'components/TutorAssignments/SelectTutorAssignment',
  component: SelectTutorAssignment
};

const Template = (args) => {
  const [taIndex, setTaIndex] = useState(0);
  const [tutorAssignments, setTutorAssignments] = useState(args.tutorAssignments);

  return (
    <SelectTutorAssignment taIndex={taIndex} setTaIndex={setTaIndex} tutorAssignments={tutorAssignments} setTutorAssignments={setTutorAssignments} />    
  )
};

export const tutorAssignments_courseId_1_quarter_20211 = Template.bind({});
tutorAssignments_courseId_1_quarter_20211.args = {
  tutorAssignments: [ {...emptyTA}, ...tutorAssignmentFixtures.tutorAssignments_courseId_1_quarter_20211]
};

export const tutorAssignments_courseId_2_quarter_20212 = Template.bind({});
tutorAssignments_courseId_2_quarter_20212.args = {
  tutorAssignments: [ {...emptyTA}, ...tutorAssignmentFixtures.tutorAssignments_courseId_2_quarter_20212]
};
