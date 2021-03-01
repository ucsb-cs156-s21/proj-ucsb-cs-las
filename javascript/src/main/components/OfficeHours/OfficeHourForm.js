import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const OfficeHourForm = ({ createOfficeHour, /*updateOfficeHour, /*existingOfficeHour*/ }) => {
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
        createOfficeHour(officeHour);


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
