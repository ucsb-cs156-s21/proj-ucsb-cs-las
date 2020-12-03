import React, { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";

const TutorAssignmentForm = ({ createTutorAssignment, updateTutorAssignment, existingTutorAssignment }) => {
    const emptyTutorAssignment = {
        courseName: "",
        tutorEmail: "",
        assignmentType: "none",
    }

    const [tutorAssignment, setTutorAssignment] = useState(existingTutorAssignment || emptyTutorAssignment);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (createTutorAssignment) {
            createTutorAssignment(tutorAssignment);
        }
        else{
            updateTutorAssignment(tutorAssignment);
        }
    }

    return (
        <Form onSubmit={handleOnSubmit}>
            <Form.Group as={Row} controlId="courseName">
                <Form.Label column sm={2}>Course Name</Form.Label>
                <Col sm={10}>
                    <Form.Control type="text" placeholder="course name" value={tutorAssignment.course} onChange={(e) => setTutorAssignment({
                        ...tutorAssignment,
                        courseName: e.target.value
                    })} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="tutorEmail">
                <Form.Label column sm={2}>
                    Tutor Email
                </Form.Label>
                <Col sm={10}>
                    <Form.Control type="text" placeholder="tutor email" value={tutorAssignment.tutorEmail} onChange={(e) => setTutorAssignment({
                        ...tutorAssignment,
                        tutorEmail: e.target.value
                    })} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="assignmentType">
                <Form.Label column sm={2}>Assignment Type</Form.Label>
                <Col sm={10}>
                    <Form.Control as="select" value={tutorAssignment.assignmentType} onChange={(e) => setTutorAssignment({ 
                        ...tutorAssignment, assignmentType: e.target.value})}>
                        <option value="none" disabled hidden>Select an Option</option>
                        <option value="LA">LA</option>
                        <option value="190J">190J</option>
                        <option value="TA">TA</option>
                    </Form.Control>
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

export default TutorAssignmentForm;
