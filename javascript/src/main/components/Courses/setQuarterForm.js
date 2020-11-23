import React, { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";

const quarterFilterForm = ({ updateCourse }) => {
    const emptyCourse = {
        name: "",
        quarter: "",
        instructorFirstName: "",
        instructorLastName: "",
        instructorEmail: "",
    }

    const [course, setCourse] = useState(existingCourse || emptyCourse);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        updateCourse(course, 0);
    }

    return (
        <Form>
            <Form.Group as={Row} controlId="name">
                <Form.Label column sm={2}>Course Name</Form.Label>
                <Col sm={10}>
                    <Form.Control type="text" placeholder="nothing" value={course.name} onChange={(e) => setCourse({
                        ...course,
                        activeQuarter: e.target.value
                    })} />
                </Col>
                <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button type="submit">Submit</Button>
                    </Col>
                </Form.Group>
            </Form.Group>
        </Form>
    );
};

export default quarterFilterForm;
