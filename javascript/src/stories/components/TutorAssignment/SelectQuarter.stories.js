import React, { useState } from 'react';

import SelectQuarter from "main/components/TutorAssignment/SelectQuarter";

import * as quarterFixtures from "main/fixtures/quarterFixtures.js"

export default {
  title: 'components/TutorAssignments/SelectQuarter',
  component: SelectQuarter
};

const Template = (args) => {
  const [_quarter, setQuarter] = useState("");
  return (
    < SelectQuarter setQuarter={setQuarter}  {...args} />
  )
};

export const OneQuarter = Template.bind({});
OneQuarter.args = {
  quarters: quarterFixtures.oneQuarter
};

export const ThreeQuarters = Template.bind({});
ThreeQuarters.args = {
    quarters: quarterFixtures.threeQuarters
};

export const ManyQuarters = Template.bind({});
ManyQuarters.args = {
    quarters: quarterFixtures.manyQuarters
};

