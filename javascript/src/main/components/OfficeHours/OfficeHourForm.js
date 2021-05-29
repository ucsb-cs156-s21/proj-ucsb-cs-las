import React, { useState, useRef } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { checkTime, checkZoomRoomLink } from "main/utils/OfficeHourFormHelpers";
import TutorAssignmentSelect from "main/components/TutorAssignment/TutorAssignmentSelect";
import TutorAssignmentDisplay from "main/components/TutorAssignment/TutorAssignmentDisplay";

const OfficeHourForm = ({ createOfficeHour, updateOfficeHour, existingOfficeHour}) => {
    const startTimeRef = useRef(null);
    const endTimeRef = useRef(null);
    const zoomRoomLinkRef = useRef(null);
    const notesRef = useRef(null);
    const emptyOfficeHour = {
        id: "",
        tutorAssignment: {
            id: ""
        },
        startTime: "",
        endTime: "",
        dayOfWeek: "Monday",
        zoomRoomLink: "",
        notes: ""
    }

    const [officeHour, setOfficeHour] = useState(existingOfficeHour||emptyOfficeHour);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        var isValid = checkInputs(); 
        if (isValid) {
            if (createOfficeHour) {
                createOfficeHour(officeHour);
            }
            else {
                updateOfficeHour(officeHour, officeHour.id);
            }
        }
      
    }
    
    const daysOfTheWeek = ["Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
   
    function checkInputs() {
        const validList = [];

        // check start time 
        const startTimeValid = checkTime(officeHour.startTime);
        addFormEffects(startTimeRef, startTimeValid);
        validList.push(startTimeValid); 

        // check end time
        const endTimeValid = checkTime(officeHour.endTime);
        addFormEffects(endTimeRef, endTimeValid);
        validList.push(endTimeValid); 

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
        }
        else {
            ref.current.classList.remove('is-valid');
            ref.current.classList.add('is-invalid');
        }
    }
    const handleDayOfWeekOnChange = (e) => setOfficeHour({
        ...officeHour,
        dayOfWeek: e.target.value
    });
    return (
        <Form onSubmit={handleOnSubmit}>
            <Form.Group as={Row} controlId="tutorAssignmentId">
                <Form.Label column sm={2}>
                    Tutor
                </Form.Label>
                <Col sm={10}>

                if({createOfficeHour})
                    <TutorAssignmentSelect
                      style={{ textAlign: "left", width: "100%" }}
                      onChange={tutorAssignmentId => setOfficeHour({...officeHour, tutorAssignment: { id: tutorAssignmentId }})}
                    />
                 
                 {
                    updateOfficeHour && <TutorAssignmentDisplay 
                        style={{ textAlign: "left", width: "100%" }}
                        tutorAssignment={ existingOfficeHour.tutorAssignment } />
                 }
                </Col>
            </Form.Group>
          <Form.Group as={Row} controlId="startTime">
                <Form.Label column sm={2}>
                    Start Time
                </Form.Label>
                <Col sm={10}>
                    <Form.Control ref={startTimeRef} type="text" placeholder="Ex: 12:00PM" value={officeHour.startTime} onChange={(e) => setOfficeHour({
                        ...officeHour,
                        startTime: e.target.value
                    })} />
                    <Form.Control.Feedback style={{ textAlign: "left" }} type="invalid">
                        Please provide a valid start time in the correct format.
                    </Form.Control.Feedback>
                    <Form.Text style={{ textAlign: "left" }} muted>Enter the start time in standard format. Ex (XX:XXAM/PM): 1:00PM, 4:00AM, 10:00PM</Form.Text>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="endTime">
                <Form.Label column sm={2}>
                    End Time
                </Form.Label>
                <Col sm={10}>
                    <Form.Control ref={endTimeRef} type="text" placeholder="Ex: 1:00PM" value={officeHour.endTime} onChange={(e) => setOfficeHour({
                        ...officeHour,
                        endTime: e.target.value
                    })} />
                    <Form.Control.Feedback style={{ textAlign: "left" }} type="invalid">
                        Please provide a valid end time in the correct format.
                    </Form.Control.Feedback>
                    <Form.Text style={{ textAlign: "left" }} muted>Enter the end time in standard format. Ex (XX:XXAM/PM): 1:00PM, 4:00AM, 10:00PM</Form.Text>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="dayOfWeek">
                <Form.Label column sm={2}>Day of Week</Form.Label>
                <Col sm={10} style = {{textAlign: 'left'}}>
                    <Form.Control as="select" onChange={handleDayOfWeekOnChange} >
                        {daysOfTheWeek.map((day) => {
                            return <option selected={officeHour.dayOfWeek === day ? true : false } key={day} value={day}>{day}</option>;
                        })}
                    </Form.Control>
                    <Form.Control.Feedback style={{ textAlign: "left" }} type="invalid">
                        Please enter a valid day of week.
                    </Form.Control.Feedback>
                    <Form.Text style={{ textAlign: "left" }} muted>Please select a day of the week from the dropdown menu</Form.Text>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="zoomRoomLink">
                <Form.Label column sm={2}>
                    Zoom Room Link
                </Form.Label>
                <Col sm={10}>
                    <Form.Control ref={zoomRoomLinkRef} type="text" placeholder="Ex: https://ucsb.zoom.us/j/XXXXXXXXX" value={officeHour.zoomRoomLink} onChange={(e) => setOfficeHour({
                        ...officeHour,
                        zoomRoomLink: e.target.value
                    })} />
                    <Form.Control.Feedback style={{ textAlign: "left" }} type="invalid">
                        Please provide a valid zoom link.
                    </Form.Control.Feedback>
                    <Form.Text style={{ textAlign: "left" }} muted>Enter the full zoom link. Ex: https://ucsb.zoom.us/j/XXXXXXXXX</Form.Text>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="notes">
                <Form.Label column sm={2}>
                    Notes
                </Form.Label>
                <Col sm={10}>
                    <Form.Control ref={notesRef} type="text" placeholder="(Optional) Ex: midterm review" value={officeHour.notes} onChange={(e) => setOfficeHour({
                        ...officeHour,
                        notes: e.target.value
                    })} />
                    <Form.Control.Feedback style={{ textAlign: "left" }} type="invalid">
                        Please provide the notes.
                    </Form.Control.Feedback>
                    <Form.Text style={{ textAlign: "left" }} muted>Notes about the office hour. Ex: midterm review</Form.Text>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
                    <Button type="submit">Submit</Button>
                </Col>
            </Form.Group>
        </Form>
    );
};

export default OfficeHourForm;