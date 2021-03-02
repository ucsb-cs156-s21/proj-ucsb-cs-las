import React from "react";
import { Form } from "react-bootstrap";
import { compareValues } from "main/utils/sortHelper"

export default ({ quarters, quarter, setQuarter }) => {

    const handleQuarterOnChange = (event) => {
        setQuarter(event.target.value);
    };

    if (quarters && quarters.sort)
        quarters.sort(compareValues(null));
    console.log("quarters",quarters);
    console.log("typeof quarters",typeof quarters)
    return (
        <Form.Group controlId="SelectQuarter.Quarter">
            <Form.Label>Quarter</Form.Label>
            <Form.Control as="select" onChange={handleQuarterOnChange}  >
                <option key={0} value={0}></option>
                {quarters.map((object, i) => {
                    return <option key={i+1} value={object}>{object}</option>;
                })}
            </Form.Control>
        </Form.Group>
    );
};

