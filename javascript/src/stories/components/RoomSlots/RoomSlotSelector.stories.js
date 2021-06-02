import React from "react";

import RoomSlotSelector from "main/components/RoomSlots/RoomSlotSelector";
import roomSlotFixtures from "fixtures/roomSlotFixtures";

export default {
    title: "components/RoomSlots/RoomSlotSelector",
    component: RoomSlotSelector,
    argTypes: {}
}

const Template = (args) => <RoomSlotSelector {...args} />;

export const MultipleRoomSlots = Template.bind({});
MultipleRoomSlots.args = {
    roomSlots: roomSlotFixtures.multipleRoomSlots,
    onChange: (id) => { console.log("selected id", id); }
};

export const SingleRoomSlot = Template.bind({});
SingleRoomSlot.args = {
    roomSlots: roomSlotFixtures.singleRoomSlot,
    onChange: (id) => { console.log("selected id", id); }
};