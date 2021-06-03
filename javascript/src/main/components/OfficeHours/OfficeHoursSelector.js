import React, {useState} from "react";
import {Form, Row, Col} from "react-bootstrap";
import {asHumanQuarter} from "main/utils/quarter.ts"


const asLabelString = (oh) => {
    return oh?.tutorAssignment?.course?.name + " " 
    + asHumanQuarter(oh?.tutorAssignment?.course?.quarter) + " "
    + oh.tutorAssignment.tutor.firstName + " " + oh.tutorAssignment.tutor.lastName + " "
    + oh.dayOfWeek + " " + oh.startTime + "-" + oh.endTime;
}

var OfficeHoursSelector = ({ officeHours, onChange }) => {

    const [index, setIndex] = useState(0);

    console.log("officeHours: ", officeHours)

    const sortedListOfOptions = 
        officeHours ? officeHours.map((officeHour, index) => <option key={index} value={index}>{asLabelString(officeHour)}</option>) : [];
    return (
        <Form.Group as={Row} controlId="Office Hours">
            <Form.Label column sm={2}>Office Hours</Form.Label>
            <Col sm={10}>
                <Form.Control as="select" value={index}  onChange={ (e) => { setIndex(e.target.value); console.log("Hello"); onChange(e.target.value)} } >
                    {sortedListOfOptions}
                </Form.Control>
            </Col>
        </Form.Group>
    );
};

export default OfficeHoursSelector;
