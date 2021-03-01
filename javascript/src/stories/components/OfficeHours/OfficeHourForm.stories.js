import React, { useState } from 'react';

import OfficeHourForm from "main/components/OfficeHours/OfficeHourForm";

export default {
  title: 'components/OfficeHours/OfficeHourForm',
  component: OfficeHourForm
};

const createOfficeHour = (officeHour) => {
  console.log("createOfficeHour called with officeHour: ",officeHour);
}

const Template = (args) => {
  return (
     <OfficeHourForm createOfficeHour={createOfficeHour} />
    )
};

export const defaultStory = Template.bind({});
defaultStory.args = {

};



