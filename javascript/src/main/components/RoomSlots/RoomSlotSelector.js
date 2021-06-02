import React from "react";
import { Cascader } from "antd";

const selectorIndices = {
    ROOM_SLOT: 0
};

export default function RoomSlotSelector({ roomSlots, onChange, ...otherProps }) {
    const onCascaderChange = (value) => {
        onChange(value[selectorIndices.ROOM_SLOT]);
    };
    
    return (
        <Cascader
          {...otherProps}
          options={roomSlots}
          onChange={onCascaderChange}
          placeholder="Select a room slot"
          disabled={!roomSlots}
        />
      );
}