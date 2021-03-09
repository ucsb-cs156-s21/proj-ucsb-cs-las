import React from 'react';

import CourseTable from "main/components/Courses/CourseTable";

export default {

    title: 'components/Courses/CourseTable',
    component: CourseTable

};

const Template = (args) => <CourseTable {...args} />;

export const Empty = Template.bind({});

Empty.args = {
    
    courses: []
    
};

export const twoClasses = Template.bind({});

twoClasses.args = {

    courses: [
        {
          name: "CMPSC 156",
          id: 1,
          quarter: "F20",
          instructorFirstName: "Phill",
          instructorLastName: "Conrad",
          instructorEmail: "phtcon@ucsb.edu",
        },
        {
          name: "CMPSC 148",
          id: 2,
          quarter: "F20",
          instructorFirstName: "Chandra",
          instructorLastName: "Krintz",
          instructorEmail: "krintz@example.org",
        },
      ]

};