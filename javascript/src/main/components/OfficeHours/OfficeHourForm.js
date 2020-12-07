import React, { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";

const OfficeHourForm = ({ createOfficeHour, updateOfficeHour, existingOfficeHour }) => {
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

    const [officeHour, setOfficeHour] = useState(existingOfficeHour || emptyOfficeHour);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (createOfficeHour) {
            createOfficeHour(officeHour);
        }
        else {
            updateOfficeHour(officeHour, officeHour.id);
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
                <Form.Label column sm={2}>Start Time</Form.Label>
                <Col sm={10}>
                    <Form.Control as="select" value={officeHour.startTime} onChange={(e) => setOfficeHour({ 
                        ...officeHour, startTime: e.target.value})}>
                        <option value="hidden">Select</option>
                        <option value="6:00 a.m.">6:00 a.m.</option>
                        <option value="7:00 a.m.">7:00 a.m.</option>
                        <option value="8:00 a.m.">8:00 a.m.</option>
                        <option value="9:00 a.m.">9:00 a.m.</option>
                        <option value="10:00 a.m.">10:00 a.m.</option>
                        <option value="11:00 a.m.">11:00 a.m.</option>
                        <option value="12:00 p.m.">12:00 p.m.</option>
                        <option value="1:00 p.m.">1:00 p.m.</option>
                        <option value="2:00 p.m.">2:00 p.m.</option>
                        <option value="3:00 p.m.">3:00 p.m.</option>
                        <option value="4:00 p.m.">4:00 p.m.</option>
                        <option value="5:00 p.m.">5:00 p.m.</option>
                        <option value="6:00 p.m.">6:00 p.m.</option>
                        <option value="7:00 p.m.">7:00 p.m.</option>
                        <option value="8:00 p.m.">8:00 p.m.</option>
                        <option value="9:00 p.m.">9:00 p.m.</option>
                    </Form.Control>
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