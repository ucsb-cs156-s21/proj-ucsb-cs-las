import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const QuarterFilterForm = ({ upsertFilter }) => {
    const [filterVal, setFilterVal] = useState("");
    const handleOnSubmit = (e) => {
        e.preventDefault();
        upsertFilter(filterVal);
    }
    return (
        <Form onSubmit={handleOnSubmit}>
            <Form.Group as={Row} controlId="name">
                <Form.Label column sm={2}>Enter quarter to filter by</Form.Label>
                <Col sm={10}>
                    <Form.Control type="text" placeholder="active quarter to filter by, enter blank field to have no filter" onChange={
                        (e) => setFilterVal(e.target.value)
                    }
                    />

                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
                    <Button type="submit">Submit</Button>
                </Col>
            </Form.Group>

        </Form >
    );
};

export default QuarterFilterForm;


