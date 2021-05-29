import React from "react";
import { useHistory } from "react-router-dom";
import useSWR from "swr";
import { Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import { fetchWithToken } from "main/utils/fetch";
import RoomSlotTable from "main/components/RoomSlots/RoomSlotTable";
import Loading from "../../components/Loading/Loading";

import { } from "main/components/RoomSlots/RoomSlotCSVButton"

const RoomSlots = () => {
  const {_user, getAccessTokenSilently: getToken } = useAuth0();
  const { data: roleInfo } = useSWR(["/api/myRole", getToken], fetchWithToken);
  const history = useHistory();

  const { data: roomSlotList, error} = useSWR(
    ["/api/public/roomslot", getToken],
    fetchWithToken
  );

  const isAdmin = roleInfo?.role?.toLowerCase() === "admin";

  if (error) {
    return (
      <h1>We encountered an error fetching room slot data; please reload the page and try again.</h1>
    );
  }
  if (!roomSlotList) {
    return <Loading />;
  }

  return (
    <>
      <h1>Room Slots</h1>
      {isAdmin && (
        <Button className="mb-3" onClick={()=>history.push("/roomslots/new")} >New Room Slot</Button>
      )}
      {(roomSlotList) && (
        <RoomSlotTable roomSlots={roomSlotList} />
      )}
    </>
  );
}

export default RoomSlots;