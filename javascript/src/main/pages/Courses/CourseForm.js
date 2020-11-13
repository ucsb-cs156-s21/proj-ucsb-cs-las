import React, { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";

export const CourseForm = ({ addCourse }) => {
  const [value1,setName] = useState("");
  const [value2,setQuarter] = useState("");
  const [value3,setInstructorFirstName] = useState("");
  const [value4,setInstructorLastName] = useState("");
  const [value5,setInstructorEmail] = useState("");
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const text1 = value1.trim();
        const text2 = value2.trim();
        const text3 = value3.trim();
        const text4 = value4.trim();
        const text5 = value5.trim();
        text1 && addCourse(text1, text2, text3, text4, text5);
        setName("");
        setQuarter("");
        setInstructorFirstName("");
        setInstructorLastName("");
        setInstructorEmail("");
      }}
    >
      <Container fluid>
        <Row>
          <Col xs={3} style={{ padding: 0 }}>
            <Form.Control
              type="text"
              placeholder="add course"
              margin="normal"
              onChange={(event) => {
                setName(event.target.value);
              }}
              value1={value1}
            />
          </Col>
          <Col xs={1} style={{ padding: 0 }}>
            <Form.Control
              type="text"
              placeholder="quarter"
              margin="normal"
              onChange={(event) => {
                setQuarter(event.target.value);
              }}
              value2={value2}
            />
          </Col>
          <Col xs={2} style={{ padding: 0 }}>
            <Form.Control
              type="text"
              placeholder="instructor first name"
              margin="normal"
              onChange={(event) => {
                setInstructorFirstName(event.target.value);
              }}
              value3={value3}
            />
          </Col>
          <Col xs={2} style={{ padding: 0 }}>
            <Form.Control
              type="text"
              placeholder="instructor last name"
              margin="normal"
              onChange={(event) => {
                setInstructorLastName(event.target.value);
              }}
              value4={value4}
            />
          </Col>
          <Col xs={3} style={{ padding: 0 }}>
            <Form.Control
              type="text"
              placeholder="instructor email"
              margin="normal"
              onChange={(event) => {
                setInstructorEmail(event.target.value);
              }}
              value5={value5}
            />
          </Col>
          <Col xs={1} style={{ padding: 0 }}>
            <Button type="submit">Submit</Button>
          </Col>
        </Row>
      </Container>
    </form>
  );
};
