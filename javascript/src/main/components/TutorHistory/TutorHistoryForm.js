import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const TutorHistoryForm = ({ searchTutorHistoryByCourse }) => {
  const emptyQuery = {
    value: "",
  }
  const [query, setQuery] = useState(emptyQuery);

  const handleOnSubmit = (e) => {
    searchTutorHistoryByCourse(query);
    e.preventDefault();
  }

  return (
    <Form onSubmit={handleOnSubmit}>
      <Form.Group as={Row} controlId="name">
        <Form.Label column sm={2}>Enter a Course</Form.Label>
        <Col sm={8}>
          <Form.Control type="text" placeholder="e.g. CMPSC 156" value={query.value} onChange={(e) => setQuery({
            ...query,
            value: e.target.value
          })} />
        </Col>
        <Col sm={2}>
          <Button type="submit">Search</Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default TutorHistoryForm;