import React from 'react';

import TutorAssignmentDisplay from "main/components/TutorAssignment/TutorAssignmentDisplay";
import tutorAssignmentFixtures from '../../../fixtures/tutorAssignmentFixtures';

export default {
  title: "components/TutorAssignment/TutorAssignmentDisplay",
  component: TutorAssignmentDisplay,
  argTypes: {
    onChange: { action: "changed" }
  }
};

const Template = (args) => <TutorAssignmentDisplay {...args} />;

export const Scott_Chow_CMPSC_156_S20 = Template.bind({});
Scott_Chow_CMPSC_156_S20.args = {
    tutorAssignment: tutorAssignmentFixtures.Scott_Chow_CMPSC_156_S20
};

export const Alex_Gerber_PSTAT_120A_M20 = Template.bind({});
Alex_Gerber_PSTAT_120A_M20.args = {
    tutorAssignment: tutorAssignmentFixtures.Alex_Gerber_PSTAT_120A_M20
};