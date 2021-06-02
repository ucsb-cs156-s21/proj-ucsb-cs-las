import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import fromFormat from "main/utils/FromFormat";
import { toAMPMFormat } from "main/utils/RoomSlotTableHelpers";
import { Button } from "react-bootstrap";

/**
 * Displays the list of room slots. Code adapted from TutorTable.
 */
const RoomSlotTable = ({ roomSlots, admin, deleteRoomSlot }) => {
    
    const renderDeleteButton = (id) => {
        return (
            <Button variant="danger" data-testid="delete-button" onClick={() => deleteRoomSlot(id)}>Delete</Button>
        )
    }

    const columns = [
        {
            dataField: "location",
            text: "Location",
            sort: true,
        },
        {
            dataField: "quarter",
            text: "Quarter",
            sort: true,
            formatter: fromFormat
        },
        {
            dataField: "dayOfWeek",
            text: "Day of Week",
            sort: true,
            formatter: (day) => {
                return day.substring(0, 1) + day.substring(1).toLowerCase();
            }
        },
        {
            dataField: "startTime",
            text: "Start Time",
            sort: true,
            formatter: toAMPMFormat
        },
        {
            dataField: "endTime",
            text: "End Time",
            sort: true,
            formatter: toAMPMFormat
        }
    ];

    if (admin) {
        columns.push({
            text: "Delete",
            isDummyField: true,
            dataField: "delete",
            formatter: (_cell, row) => renderDeleteButton(row.id)
        });
    }

    return <BootstrapTable
        bootstrap4={true}
        keyField="id"
        data={roomSlots}
        columns={columns}
    />;
}

export default { RoomSlotTable, deleteRoomSlot };