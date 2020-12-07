import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const TutorHistorySearch = ({ searchForTutor }) => {
  const emptyQuery = {
    value: "",
  }
  const [query, setQuery] = useState(emptyQuery);
  
  const handleOnSubmit = (e) => {
    searchForTutor(query);
    e.preventDefault();
  }

  return (
    <Form onSubmit={handleOnSubmit}>
      <Form.Group as={Row} controlId="name">
        <Form.Label column sm={2}>Enter Tutor Name</Form.Label>
        <Col sm={10}>
          <Form.Control type="text" placeholder="tutor name" value={query.value} onChange={(e) => setQuery({
            ...query,
            value: e.target.value
          })} />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Col sm={{ span: 10, offset: 2}}>
          <Button type="submit">Search</Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default TutorHistorySearch;
