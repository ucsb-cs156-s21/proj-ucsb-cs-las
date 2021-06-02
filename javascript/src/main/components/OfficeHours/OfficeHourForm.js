import React, { useState, useRef } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { checkZoomRoomLink } from "main/utils/OfficeHourFormHelpers";
import TutorAssignmentSelect from "main/components/TutorAssignment/TutorAssignmentSelect";
import { checkTime } from "main/utils/FormHelpers";
import RoomSlotSelect from "main/components/RoomSlots/RoomSlotSelect"
import TutorAssignmentDisplay from "main/components/TutorAssignment/TutorAssignmentDisplay";

const OfficeHourForm = ({ createOfficeHour, updateOfficeHour, existingOfficeHour }) => {
    const startTimeRef = useRef(null);
    const endTimeRef = useRef(null);
    const zoomRoomLinkRef = useRef(null);
    const notesRef = useRef(null);
    const emptyOfficeHour = {
        id: "",
        tutorAssignment: {
            id: ""
        },
        roomSlot: {
            id: "",
        },
        zoomRoomLink: "",
        notes: ""
    }

    const [officeHour, setOfficeHour] = useState(existingOfficeHour || emptyOfficeHour);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        var isValid = checkInputs();
        if (isValid) {
            console.log(officeHour);
            if (createOfficeHour) {
                createOfficeHour(officeHour);
            } else {
                updateOfficeHour(officeHour, officeHour.id);
            }
        }

    }

    const daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    function checkInputs() {
        const validList = [];

        // check zoom room link
        const zoomRoomLinkValid = checkZoomRoomLink(officeHour.zoomRoomLink);
        addFormEffects(zoomRoomLinkRef, zoomRoomLinkValid);
        validList.push(zoomRoomLinkValid);

        return !validList.includes(false);
    }

    function addFormEffects(ref, isValid) {
        if (isValid) {
            ref.current.classList.add('is-valid');
            ref.current.classList.remove('is-invalid');
        } else {
            ref.current.classList.remove('is-valid');
            ref.current.classList.add('is-invalid');
        }
    }

    return ( <
        Form onSubmit = { handleOnSubmit } >
        <
        Form.Group as = { Row }
        controlId = "roomSlot" >
        <
        Form.Label column sm = { 2 } >
        Room Slot <
        /Form.Label> <
        Col sm = { 10 } >
        <<
        << << < HEAD <
        RoomSlotSelect ===
        === =

        {
            createOfficeHour && < TutorAssignmentSelect >>>
            >>> > main
            style = {
                { textAlign: "left", width: "100%" } }
            onChange = { roomSlotId => setOfficeHour({...officeHour, roomSlot: { id: roomSlotId } }) }
            />
        } {
            updateOfficeHour && < TutorAssignmentDisplay
            style = {
                { textAlign: "left", width: "100%" } }
            tutorAssignment = { existingOfficeHour.tutorAssignment }
            />
        } <
        /Col> <
        /Form.Group> <
        Form.Group as = { Row }
        controlId = "tutorAssignmentId" >
        <
        Form.Label column sm = { 2 } >
        Tutor <
        /Form.Label> <
        Col sm = { 10 } >
        <
        TutorAssignmentSelect style = {
            { textAlign: "left", width: "100%" } }
        onChange = { tutorAssignmentId => setOfficeHour({...officeHour, tutorAssignment: { id: tutorAssignmentId } }) }
        /> <
        /Col> <
        /Form.Group> <
        Form.Group as = { Row }
        controlId = "zoomRoomLink" >
        <
        Form.Label column sm = { 2 } >
        Zoom Room Link <
        /Form.Label> <
        Col sm = { 10 } >
        <
        Form.Control ref = { zoomRoomLinkRef }
        type = "text"
        placeholder = "Ex: https://ucsb.zoom.us/j/XXXXXXXXX"
        value = { officeHour.zoomRoomLink }
        onChange = {
            (e) => setOfficeHour({
                ...officeHour,
                zoomRoomLink: e.target.value
            })
        }
        /> <
        Form.Control.Feedback style = {
            { textAlign: "left" } }
        type = "invalid" >
        Please provide a valid zoom link. <
        /Form.Control.Feedback> <
        Form.Text style = {
            { textAlign: "left" } }
        muted > Enter the full zoom link.Ex: https: //ucsb.zoom.us/j/XXXXXXXXX</Form.Text>
        <
        /Col> <
        /Form.Group> <
        Form.Group as = { Row }
        controlId = "notes" >
        <
        Form.Label column sm = { 2 } >
        Notes <
        /Form.Label> <
        Col sm = { 10 } >
        <
        Form.Control ref = { notesRef }
        type = "text"
        placeholder = "(Optional) Ex: midterm review"
        value = { officeHour.notes }
        onChange = {
            (e) => setOfficeHour({
                ...officeHour,
                notes: e.target.value
            })
        }
        /> <
        Form.Control.Feedback style = {
            { textAlign: "left" } }
        type = "invalid" >
        Please provide the notes. <
        /Form.Control.Feedback> <
        Form.Text style = {
            { textAlign: "left" } }
        muted > Notes about the office hour.Ex: midterm review < /Form.Text> <
        /Col> <
        /Form.Group> <
        Form.Group as = { Row } >
        <
        Col sm = {
            { span: 10, offset: 2 } } >
        <
        Button type = "submit" > Submit < /Button> <
        /Col> <
        /Form.Group> <
        /Form>
    );
};

export default OfficeHourForm;