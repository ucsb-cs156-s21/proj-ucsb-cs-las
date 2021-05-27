import React from 'react';

import TutorAssignmentSelect from "main/components/TutorAssignment/TutorAssignmentSelect";

export default {
  title: "components/TutorAssignment/TutorAssignmentSelect",
  component: TutorAssignmentSelect,
  argTypes: {
    onChange: { action: "changed" }
  }
};

const Template = (args) => <TutorAssignmentSelect {...args} />;

export const Uncontrolled = Template.bind({});
Uncontrolled.args = {
  quarterProvider: async () => ["20204", "20211", "20212"],
  courseProvider: async () => [{ id: 1, name: "CMPSC 156" }, { id: 2, name: "CMPSC 148" }],
  tutorAssignmentProvider: async () => [{ id: 1, tutor: { firstName: "John", lastName: "Doe" }}, { id: 2, tutor: { firstName: "Jane", lastName: "Doe" }}]
};