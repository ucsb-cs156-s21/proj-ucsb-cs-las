import React from 'react';

import TutorNotesTable from "main/components/TutorNotes/TutorNotesTable";
import tutorNotesFixtures from "fixtures/tutorNotesFixtures";

export default {

    title: 'components/TutorNotes/TutorNotesTable',
    component: TutorNotesTable

};

const Template = (args) => <TutorNotesTable {...args} />;

export const Empty = Template.bind({});

Empty.args = {
    tutorNotes: [],
    isInstructor: true
};


export const Null = Template.bind({});

Null.args = {
    tutorNotes: null,
    isInstructor: true
};

export const twoNotes = Template.bind({});

twoNotes.args = {
    tutorNotes: tutorNotesFixtures.twoTutorNotesEntries,
    isInstructor: true
};

export const twoNotesNotInstructor = Template.bind({});

twoNotesNotInstructor.args = {
    tutorNotes: tutorNotesFixtures.twoTutorNotesEntries,
    isInstructor: false
};