import React, { useState } from 'react';

import OfficeHourForm from "main/components/OfficeHours/OfficeHourForm";
import * as courseFixtures from "main/fixtures/courseFixtures.js"
import * as tutorAssignmentFixtures from "main/fixtures/tutorAssignmentFixtures.js"


export default {
  title: 'components/OfficeHours/OfficeHourForm',
  component: OfficeHourForm
};

const createOfficeHour = (officeHour) => {
  console.log("createOfficeHour called with officeHour: ",officeHour);
}

const quarters=tutorAssignmentFixtures.fetchersFromFixtures.getQuarters();

console.log("quarters=",quarters);

const Template = (args) => {
  return (
    <OfficeHourForm createOfficeHour={createOfficeHour}  fetchers={tutorAssignmentFixtures.fetchersFromFixtures} quarters={quarters} {...args} />
    )
};

export const defaultStory = Template.bind({});
defaultStory.args = {};




