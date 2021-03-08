import React, { useState, useRef } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { checkCourseQuarter } from "main/utils/CourseFormHelpers";

const QuarterFilterForm = ({ upsertFilter }) => {
    const [filterVal, setFilterVal] = useState("");
    const quarterRef = useRef(null);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        upsertFilter(filterVal);

        var isValid = checkCourseQuarter(filterVal);
        
        if (isValid) {
            quarterRef.current.classList.add('is-valid');
            quarterRef.current.classList.remove('is-invalid');
        } else {
            quarterRef.current.classList.remove('is-valid');
            quarterRef.current.classList.add('is-invalid');
        }
    }
    
    return (
        <Form onSubmit={handleOnSubmit}>
        <Form.Group as={Row} controlId="name">
            <Form.Label column sm={2}>Enter quarter to filter by</Form.Label>
            <Col sm={10}>
                <Form.Control ref={quarterRef} type="text" placeholder="Ex: W21" onChange={
                    (e) => setFilterVal(e.target.value)
                }
                />
                <Form.Control.Feedback style={{ textAlign: "left" }} type="invalid">
                    Please provide a valid quarter.
                </Form.Control.Feedback>
                <Form.Text style={{ textAlign: "left" }} muted>Use the first name of the quarter with the last 2 digits of the year. Ex (2020): F20, W20, S20, M20</Form.Text>
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