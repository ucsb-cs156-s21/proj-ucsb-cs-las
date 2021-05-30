import React, {useState} from "react";
import {Form} from "react-bootstrap";
import {asHumanQuarter} from "main/utils/quarter.ts"


const asLabelString = (oh) => {
    return oh.tutorAssignment.course.name + " " 
    + asHumanQuarter(oh.tutorAssignment.course.quarter) + " "
    + oh.tutorAssignment.tutor.firstName + " " + oh.tutorAssignment.tutor.lastName + " "
    + oh.dayOfWeek + " " + oh.startTime + "-" + oh.endTime;
}

var OfficeHoursSelector = ({ officeHours, onChange }) => {

    const [index, setIndex] = useState(0);
 

    const sortedListOfOptions = 
        officeHours.map((officeHour, index) => <option key={index} value={index}>{asLabelString(officeHour)}</option>);
    return (
        <Form.Control as="select" value={index} onChange={ (e) => { setIndex(e.target.value); onChange(e)} } >
            {sortedListOfOptions}
        </Form.Control>
    );
};

export default OfficeHoursSelector;
