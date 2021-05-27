import React from "react";
import RoomSlotForm from "main/components/RoomSlots/RoomSlotForm";
import { useAuth0 } from "@auth0/auth0-react";
import { buildCreateRoomSlot } from "main/services/RoomSlots/RoomSlotService";
import { useHistory } from "react-router-dom";
import { useToasts } from 'react-toast-notifications'

const NewRoomSlot = () => {
    const history = useHistory();
    const {addToast} = useToasts();

    const createRoomSlot = buildCreateRoomSlot(
        // getToken,
        // (response) => {
        //   if (response.error) {
        //     console.log("error message: ", response.error);
        //     addToast(response.error, { appearance: 'error' });
        //   }
        //   else {
        //     history.push("/roomslots");
        //     addToast("New Room Slot Saved", { appearance: 'success' });
        //   }
        // },
        // (err) => {
        //   console.log("error message: ", err);
        //   addToast("Error saving room slot", { appearance: 'error' });
        // }
      );

      return(
          <>
            <h1>Add New Room Slot</h1>
            <RoomSlotForm createRoomSlot={createRoomSlot}/>
          </>
      );

};

export default NewRoomSlot;