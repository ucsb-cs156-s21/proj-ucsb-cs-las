import React from "react";
import { Form } from "react-bootstrap";
import { compareValues } from "main/utils/sortHelper"

export const SelectQuarter = ({ quarters, quarter, setQuarter}) => {

    const handleQuarterOnChange = (event) => {
        setQuarter(event.target.value);
    };

    quarters.sort(compareValues(null));

    return (
        <Form.Group controlId="SelectQuarter.Quarter">
            <Form.Label>Quarter</Form.Label>
            <Form.Control as="select" onChange={handleQuarterOnChange} value={quarter} >
                {quarters.map(  (object, i) => {
                    return <option key={i} value={object}>{object}</option>;
                })}
            </Form.Control>
        </Form.Group>
    );
};

