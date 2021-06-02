import React from "react";
import { Cascader } from "antd";
import { asHumanQuarter } from "main/utils/quarter";
import { toAMPMFormat } from "main/utils/RoomSlotTableHelpers";

const selectorIndices = {
    ROOM_SLOT: 0
};

export default function RoomSlotSelector({ roomSlots, onChange, ...otherProps }) {
    const onCascaderChange = (value) => {
        onChange(value[selectorIndices.ROOM_SLOT]);
    };

    // Day of the week is serialized as an all-caps value by backend, so give it proper capitalization
    const formatDayOfWeek = (day) => {
        return day.substring(0, 1) + day.substring(1).toLowerCase();
    }

    let options = roomSlots.map((slot) => {
        return {
            value: slot.id,
            label: [
                asHumanQuarter(slot.quarter),
                slot.location, 
                formatDayOfWeek(slot.dayOfWeek),
                toAMPMFormat(slot.startTime) + "-" + toAMPMFormat(slot.endTime)
            ].join(" "),
            isLeaf: true
        };
    });
    
    return (
        <Cascader
          {...otherProps}
          options={options}
          onChange={onCascaderChange}
          placeholder="Select a room slot"
          disabled={!roomSlots}
        />
      );
}