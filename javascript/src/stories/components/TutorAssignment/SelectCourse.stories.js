import React, { useState } from 'react';

import SelectCourse from "main/components/TutorAssignment/SelectCourse";

import * as courseFixtures from "main/fixtures/courseFixtures.js"

export default {
  title: 'components/TutorAssignments/SelectCourse',
  component: SelectCourse
};

const Template = (args) => {
  const [courseIndex, setCourseIndex] = useState(0);
  const [courses, setCourses] = useState(args.courses);

  return (
    <SelectCourse courseIndex={courseIndex} setCourseIndex={setCourseIndex} courses={courses} setCourses={setCourses} />    
  )
};

export const oneW21Course = Template.bind({});
oneW21Course.args = {
  courses: [{}, ...courseFixtures.oneW21Course]
};

export const threeS21Courses = Template.bind({});
threeS21Courses.args = {
    courses: [{}, ...courseFixtures.threeS21Courses]
};

export const ManyCourses = Template.bind({});
ManyCourses.args = {
    courses: [{}, ...courseFixtures.manyCourses]
};

