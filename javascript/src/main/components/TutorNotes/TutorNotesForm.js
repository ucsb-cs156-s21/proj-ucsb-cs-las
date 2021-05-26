import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const TutorNotesForm = ({ createTutorNotes, updateTutorNotes, existingTutorNotes }) => {
  const emptyTutorNotes = {
    id: "",
    course: "",
    tutor: "",
    message: ""
  };

  const [tutorNotes, setTutorNotes] = useState(existingTutorNotes || emptyTutorNotes);

  const handleOnSubmit = e => {
    e.preventDefault();
    if (createTutorNotes) {
      createTutorNotes(tutorNotes);
    } else updateTutorNotes(tutorNotes, tutorNotes.id);
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      <Form.Group as={Row} controlId="course">
        <Form.Label column sm={2}>
          Course
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            placeholder="Course Ex: CS156"
            value={tutorNotes.Course}
            onChange={e =>
              setTutor({
                ...tutorNotes,
                courses: e.target.value
              })
            }
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="tutor">
        <Form.Label column sm={2}>
          Tutor
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            placeholder="Tutor"
            value={tutorNotes.tutor}
            onChange={e =>
              setTutorNotes({
                ...tutorNotes,
                tutor: e.target.value
              })
            }
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="message">
        <Form.Label column sm={2}>
          Message
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            placeholder="tutor note contents"
            value={tutor.message}
            onChange={e =>
              setTutorNotes({
                ...tutorNotes,
                message: e.target.value
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

export default TutorNotesForm;