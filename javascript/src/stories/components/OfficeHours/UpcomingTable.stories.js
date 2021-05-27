import React from 'react';

import UpcomingTable from "main/components/OfficeHours/UpcomingTable";

export default {

    title: 'components/OfficeHours/UpcomingTable',
    component: UpcomingTable

};

const Template = args => <UpcomingTable {...args} />;

// Empty (default) table

export const Empty = Template.bind({});

Empty.args = {

    courses: []

};

// Table with some courses and room slots listed

export const Demo = Template.bind({});

Demo.args = {



};