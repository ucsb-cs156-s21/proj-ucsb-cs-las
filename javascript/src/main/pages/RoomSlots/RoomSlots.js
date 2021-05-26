import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

import RoomSlotTable from "main/components/RoomSlots/RoomSlotTable";

const RoomSlots = () => {
  const history = useHistory();
  return (
    <>
      <h1>Room Slots</h1>
      <Button className="mb-3" onClick={()=>history.push("/roomslots/new")} >New Room Slot</Button>
      <RoomSlotTable roomSlots={[]} admin={true} deleteRoomSlot={() => {}} />
    </>
  );
}

export default RoomSlots;