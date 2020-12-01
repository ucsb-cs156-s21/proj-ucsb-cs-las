import React, { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";

const TutorForm = ({ createTutor, updateTutor, existingTutor }) => {
  const emptyTutor = {
    id: "",
    firstName: "",
    lastName: "",
    email: ""
  };

  const [tutor, setTutor] = useState(existingTutor || emptyTutor);

  const handleOnSubmit = e => {
    e.preventDefault();
    if (createTutor) {
      createTutor(tutor);
    } else updateTutor(tutor, tutor.id);
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      <Form.Group as={Row} controlId="id">
        <Form.Label column sm={2}>
          Tutor Id
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            placeholder="tutor id"
            value={tutor.id}
            onChange={e =>
              setTutor({
                ...tutor,
                id: e.target.value
              })
            }
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="firstName">
        <Form.Label column sm={2}>
          First Name
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            placeholder="Tutor first name"
            value={tutor.firstName}
            onChange={e =>
              setTutor({
                ...tutor,
                firstName: e.target.value
              })
            }
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="lastName">
        <Form.Label column sm={2}>
          Last Name
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            placeholder="Tutor last name"
            value={tutor.lastName}
            onChange={e =>
              setTutor({
                ...tutor,
                lastName: e.target.value
              })
            }
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="email">
        <Form.Label column sm={2}>
          Email
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="email"
            placeholder="Tutor email"
            value={tutor.email}
            onChange={e =>
              setTutor({
                ...tutor,
                email: e.target.value
              })
            }
          />
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

export default TutorForm;
