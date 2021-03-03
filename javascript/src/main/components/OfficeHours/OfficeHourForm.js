import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { checkEmail, checkFilled } from "main/utils/OfficeHoursFormHelpers";


const OfficeHourForm = ({ createOfficeHour, /*updateOfficeHour, /*existingOfficeHour*/ }) => {
    const idRef = useRef(null);
    const startTimeRef = useRef(null);
    const endTimeRef = useRef(null);
    const dayOfWeekRef = useRef(null);
    const zoomRoomLinkRef = useRef(null);
    const emptyOfficeHour = {
        id: "",
        tutorAssignment: {
            id: ""
        },
        startTime: "",
        endTime: "",
        dayOfWeek: "",
        zoomRoomLink: "",
        notes: ""
    }

    const [officeHour, setOfficeHour] = useState(emptyOfficeHour);

    const handleOnSubmit = (e) => {
        e.preventDefault();

        var isValid = checkInputs();

        createOfficeHour(officeHour);

      
    }

    function checkInputs() {
        const validList = [];
        //check officehour name
        const idValid = checkFilled(officeHour.id);
        addFormEffects(idRef, idValid);
        validList.push(idValid);

        //check start time
        const startTimeValid = checkFilled(officeHour.startTime);
        addFormEffects(startTimeRef, startTimeValid);
        validList.push(startTimeValid);

        //check end time
        const endTimeValid = checkFilled(officeHour.endTime);
        addFormEffects(endTimeRef, endTimeValid);
        validList.push(endTimeValid);

        //check day of week
        const dayOfWeekValid = checkFilled(officeHour.dayOfWeek);
        addFormEffects(dayOfWeekRef, dayOfWeekValid);
        validList.push(dayOfWeekValid);

        //check zoom room Link
        const zoomRoomLinkValid = checkZoomRoomLink(officeHour.zoomRoomLink);
        addFormEffects(zoomRoomRef, zoomRoomLinkValid);
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

    return (
        <Form onSubmit={handleOnSubmit}>
            <Form.Group as={Row} controlId="tutorAssignmentId">
                <Form.Label column sm={2}>
                    Tutor Assignment ID
                </Form.Label>
                <Col sm={10}>
                    <Form.Control type="text" placeholder="Tutor Assignment Id" value={officeHour.tutorAssignment.id} onChange={(e) => setOfficeHour({
                        ...officeHour,
                        tutorAssignment: {
                            id: e.target.value
                        }
                    })} />
                </Col>
            </Form.Group>
          <Form.Group as={Row} controlId="startTime">
                <Form.Label column sm={2}>
                    Start Time
                </Form.Label>
                <Col sm={10}>
                    <Form.Control type="text" placeholder="Start Time" value={officeHour.startTime} onChange={(e) => setOfficeHour({
                        ...officeHour,
                        startTime: e.target.value
                    })} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="endTime">
                <Form.Label column sm={2}>
                    End Time
                </Form.Label>
                <Col sm={10}>
                    <Form.Control type="text" placeholder="End Time" value={officeHour.endTime} onChange={(e) => setOfficeHour({
                        ...officeHour,
                        endTime: e.target.value
                    })} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="dayOfWeek">
                <Form.Label column sm={2}>
                    Day of Week
                </Form.Label>
                <Col sm={10}>
                    <Form.Control type="text" placeholder="Day of Week" value={officeHour.dayOfWeek} onChange={(e) => setOfficeHour({
                        ...officeHour,
                        dayOfWeek: e.target.value
                    })} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="zoomRoomLink">
                <Form.Label column sm={2}>
                    Zoom Room Link
                </Form.Label>
                <Col sm={10}>
                    <Form.Control type="text" placeholder="Zoom Room Link" value={officeHour.zoomRoomLink} onChange={(e) => setOfficeHour({
                        ...officeHour,
                        zoomRoomLink: e.target.value
                    })} />
                     <Form.Control.Feedback style={{ textAlign: "left" }} type="invalid">
                        Please provide a valid zoom link.
                    </Form.Control.Feedback>
                    <Form.Text style={{ textAlign: "left" }} muted>Please use a valid ucsb zoom link prefixed with https://</Form.Text>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="notes">
                <Form.Label column sm={2}>
                    Notes
                </Form.Label>
                <Col sm={10}>
                    <Form.Control type="text" placeholder="Notes" value={officeHour.notes} onChange={(e) => setOfficeHour({
                        ...officeHour,
                        notes: e.target.value
                    })} />
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
