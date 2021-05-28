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

    courses: [
        {
            id: 1,
            startTime: "12:00PM",
            endTime: "1:00PM",
            dayOfWeek: "Monday",
            tutorName: "Phill Conrad",
            tutorID: "2",
            courseNameYear: "CMPSC 156 Fall 2020",
            email: "phtcon@ucsb.edu",
            zoomRoomLink: "https://ucsb.zoom.us/j/12345678",
        },
        {
            id: 3,
            startTime: "12:00PM",
            endTime: "1:00PM",
            dayOfWeek: "Monday",
            tutorName: "Chandra Krintz",
            tutorID: "4",
            courseNameYear: "CMPSC 148 Fall 2020",
            email: "krintz@exmaple.org",
            zoomRoomLink: "https://ucsb.zoom.us/j/12345678",
        },
    ]

};