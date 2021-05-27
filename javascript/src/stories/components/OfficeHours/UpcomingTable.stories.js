import React from 'react';

import UpcomingOfficeHourTable from "main/components/OfficeHours/UpcomingOfficeHourTable";

export default {

    title: 'components/OfficeHours/UpcomingOfficeHourTable',
    component: UpcomingOfficeHourTable

};

// template for office hour table
const Template = args => <UpcomingOfficeHourTable {...args} />;

// copy template as empty table
export const Empty = Template.bind({});

Empty.args = {

    courses: [],
    roomslots: []

};

// copy template with some dummy data
export const Demo = Template.bind({});

Demo.args = {

    /*
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
    */

};