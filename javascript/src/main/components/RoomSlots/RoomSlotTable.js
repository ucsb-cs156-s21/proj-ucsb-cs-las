
import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

/**
 * Displays the list of room slots. Code adapted from TutorTable.
 */
const RoomSlotTable = ({ roomSlots, admin, deleteRoomSlot }) => {
    const history = useHistory();

    const AdminRenderWrapper = ({children }) => {
        return (admin && children);
    };

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
        },
        {
            dataField: "dayOfWeek",
            text: "Day of Week",
            sort: true,
        },
        {
            dataField: "startTime",
            text: "Start Time",
            sort: true,
        },
        {
            dataField: "endTime",
            text: "End Time",
            sort: true,
        }
    ];

    return <BootstrapTable
        bootstrap4={true}
        keyField="id"
        data={roomSlots}
        columns={columns}
    />;
}

export default RoomSlotTable;