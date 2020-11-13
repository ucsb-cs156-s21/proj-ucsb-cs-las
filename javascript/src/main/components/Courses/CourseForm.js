import React from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";

const CourseForm = () => {
    return (
        <Form>
            <Form.Group as={Row}>
                <Form.Label column sm={2}>
                    Course Name
                </Form.Label>
                <Col sm={10}>
                    <Form.Control type="name" placeholder="course name" />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm={2}>
                    Quarter
                </Form.Label>
                <Col sm={10}>
                    <Form.Control type="quarter" placeholder="quarter" />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm={2}>
                    Last Name
                </Form.Label>
                <Col sm={10}>
                    <Form.Control type="instructorFirstName" placeholder="instructor first name" />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm={2}>
                    First Name
                </Form.Label>
                <Col sm={10}>
                    <Form.Control type="instructorLastName" placeholder="instructor last name" />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm={2}>
                    Email
                </Form.Label>
                <Col sm={10}>
                    <Form.Control type="instructorEmail" placeholder="instructor email" />
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

export default CourseForm;
