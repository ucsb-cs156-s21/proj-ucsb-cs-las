import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { asHumanQuarter } from "main/utils/quarter";
import { toAMPMFormat } from "main/utils/RoomSlotTableHelpers";

export default function RoomSlotSelector({ roomSlots, onChange }) {
    const [id, setId] = useState(0);

    // Day of the week is serialized as an all-caps value by backend, so give it proper capitalization
    const formatDayOfWeek = (day) => {
        return day.substring(0, 1) + day.substring(1).toLowerCase();
    };

    const asLabelString = (slot) => {
        return [
            asHumanQuarter(slot.quarter),
            slot.location, 
            formatDayOfWeek(slot.dayOfWeek),
            toAMPMFormat(slot.startTime) + "-" + toAMPMFormat(slot.endTime)
        ].join(" ");
    };

    const handleChange = (e) => {
        setId(e.target.value);
        onChange(e.target.value);
    };

    let options = roomSlots.map((slot) => {
        return <option key={slot.id} value={slot.id}>{asLabelString(slot)}</option>;
    });
    
    return (
        <Form.Control as="select" value={id} onChange={handleChange}>
            {options}
        </Form.Control>
    );
}