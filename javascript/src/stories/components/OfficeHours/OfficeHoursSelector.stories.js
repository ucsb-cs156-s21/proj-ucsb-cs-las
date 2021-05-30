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
    onChange: (e) => {console.log("e.target.value=",e.target.value)}
};

export const threeOfficeHours = Template.bind({});
threeOfficeHours.args = {
    officeHours:  officeHoursFixtures.threeOfficeHours,
    onChange: (e) => {console.log("e.target.value=",e.target.value)}
};

