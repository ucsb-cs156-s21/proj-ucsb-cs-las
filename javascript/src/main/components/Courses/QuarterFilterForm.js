import React, { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";

const QuarterFilterForm = (existingFilter, createFilter, updateFilter, deleteFilter) => {
    const emptyFilter = {
        "quarterFilterValue": ""
    }
    const [filter, setFilter] = useState(emptyFilter || existingFilter);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (createFilter) {
            createFilter(filter);
        }
        else if (updateFilter) {
            updateFilter(filter);
        }
        else {
            deleteFilter();
        }

    }
    return (
        <Form onSubmit={handleOnSubmit}>
            <Form.Group as={Row} controlId="name">
                <Form.Label column sm={2}>Enter quarter to filter by</Form.Label>
                <Col sm={10}>
                    <Form.Control type="text" placeholder="active quarter to filter by" value={filter.quarterFilterValue} onChange={
                        (e) => setFilter({ ...filter, quarterFilterValue: e.target.value })
                    }
                    />

                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
                    <Button type="submit">Submit</Button>
                </Col>
            </Form.Group>
            {existingFilter ?
                <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button type="submit">Submit</Button>
                    </Col>
                </Form.Group> : <></>}

        </Form>
    );
};

export default QuarterFilterForm;


