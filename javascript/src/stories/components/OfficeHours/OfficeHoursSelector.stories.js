import React from 'react';

import OfficeHoursSelector from "main/components/OfficeHours/OfficeHoursSelector";
import officeHoursFixtures from '../../../fixtures/officeHoursFixtures';

export default {
  title: "components/OfficeHours/OfficeHoursSelector",
  component: OfficeHoursSelector
};

const Template = (args) => <OfficeHoursSelector {...args} />;

export const oneOfficeHour = Template.bind({});
oneOfficeHour.args = {
    officeHours: [ officeHoursFixtures.oneOfficeHour],
    onChange: (i) => {console.log("i",i)}
};

export const threeOfficeHours = Template.bind({});
threeOfficeHours.args = {
    officeHours:  officeHoursFixtures.threeOfficeHours,
    onChange: (i) => {console.log("i",i)}
};

