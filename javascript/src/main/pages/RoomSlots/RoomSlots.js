import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
const RoomSlots = () => {
  const history = useHistory();
  return (
    <>
      <h1>Room Slots</h1>
      <Button className="mb-3" onClick={()=>history.push("/roomslots/new")} >New Room Slot</Button>
    </>
  );
}

export default RoomSlots;