import React, { useState, useRef } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import {checkTime, checkFilled, checkCourseQuarter} from "main/utils/FormHelpers";
import { formatTimeToLocalTime } from "main/utils/RoomSlotFormHelpers";

const RoomSlotForm = ({ createRoomSlot/*, updateRoomSlot, existingRoomSlot*/}) =>{
    const locationRef = useRef(null);
    const startTimeRef = useRef(null);
    const endTimeRef = useRef(null);
    const quarterRef = useRef(null);
    
    const emptyRoomSlot = {
        location: "",
        quarter: "",
        // quarter: {
        //     activeQuarter:"",
        //     id: 0    
        // },
        id: 0,
        dayOfWeek: "Monday",
        // startTime: {
        //     hour: "",
        //     minute: "",
        //     nano: "",
        //     second: "",
        // }
        startTime:"",
        endTime:""
        // endTime: {
        //     hour: "",
        //     minute: "",
        //     nano: "",
        //     second: "",
        // }
    }

    const [roomSlot, setRoomSlot] = useState(emptyRoomSlot);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        var isValid = checkInputs();

        if(isValid){
            let quarterNum = "1";
            if(roomSlot.quarter.substr(0, 1)==="S"){
                quarterNum =  "2";
            }
            else if(roomSlot.quarter.substr(0, 1)==="M"){
                quarterNum =  "3";
            }
            else if(roomSlot.quarter.substr(0, 1)==="F"){
                quarterNum =  "4";
            }
            let formattedQuarter = "20" + roomSlot.quarter.substr(1, 2) + quarterNum;

            let formattedDayOfWeek = roomSlot.dayOfWeek.toUpperCase();

            let formattedStartTime = formatTimeToLocalTime(roomSlot.startTime);
            let formattedEndTime = formatTimeToLocalTime(roomSlot.endTime);

            // roomSlot.quarter = new ActiveQuarter(0,formatedQuarter);
            // roomSlot.quarter.id = 0;
            // if(createRoomSlot)
                createRoomSlot({...roomSlot,
                    quarter: formattedQuarter, 
                    dayOfWeek: formattedDayOfWeek,
                    startTime: formattedStartTime,
                    endTime: formattedEndTime
                });
            
            // else
            //     updateRoomSlot({...roomSlot, quarter: formatedQuarter});
        }
    }

    const daysOfTheWeek = ["Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]

    function checkInputs(){
        const validList = [];

        //check location
        const locationValid = checkFilled(roomSlot.location);
        addFormEffects(locationRef, locationValid);
        validList.push(locationValid);

        //check valid quarter
        const quarterValid = checkCourseQuarter(roomSlot.quarter);
        addFormEffects(quarterRef, quarterValid);
        validList.push(quarterValid);

        // check start time 
        const startTimeValid = checkTime(roomSlot.startTime);
        addFormEffects(startTimeRef, startTimeValid);
        validList.push(startTimeValid); 

        // check end time
        const endTimeValid = checkTime(roomSlot.endTime);
        addFormEffects(endTimeRef, endTimeValid);
        validList.push(endTimeValid);

        return !validList.includes(false);
    }

    function addFormEffects(ref, isValid) {
        if (isValid) {
            ref.current.classList.add('is-valid');
            ref.current.classList.remove('is-invalid');
        }
        else {
            ref.current.classList.remove('is-valid');
            ref.current.classList.add('is-invalid');
        }
    }

    const handleDayOfWeekOnChange = (e) => setRoomSlot({
        ...roomSlot,
        dayOfWeek: e.target.value
    });

    return(
        <Form onSubmit={handleOnSubmit}>
            
            <Form.Group as={Row} controlId="location">
                <Form.Label column sm={2}>Location</Form.Label>
                <Col sm={10}>
                    <Form.Control ref={locationRef} type="text" placeholder="Ex: Library" value={roomSlot.location} onChange={(e) => setRoomSlot({
                        ...roomSlot,
                        location: e.target.value
                    })} />
                    <Form.Control.Feedback style={{ textAlign: "left" }} type="invalid">
                        Please provide a location.
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="quarter">
                <Form.Label column sm={2}>
                    Quarter
                </Form.Label>
                <Col sm={10}>
                    <Form.Control ref={quarterRef} type="text" placeholder="Ex: F20" value={roomSlot.quarter} onChange={(e) => setRoomSlot({
                        ...roomSlot,
                        quarter: e.target.value
                    })} />
                    <Form.Control.Feedback style={{ textAlign: "left" }} type="invalid">
                        Please provide a valid quarter.
                    </Form.Control.Feedback>
                    <Form.Text style={{ textAlign: "left" }} muted>Use the first name of the quarter with the last 2 digits of the year. Ex (2020): F20, W20, S20, M20</Form.Text>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="startTime">
                <Form.Label column sm={2}>
                    Start Time
                </Form.Label>
                <Col sm={10}>
                    <Form.Control ref={startTimeRef} type="text" placeholder="Ex: 12:00PM" value={roomSlot.startTime} onChange={(e) => setRoomSlot({
                        ...roomSlot,
                        startTime: e.target.value
                    })} />
                    <Form.Control.Feedback style={{ textAlign: "left" }} type="invalid">
                        Please provide a valid start time in the correct format.
                    </Form.Control.Feedback>
                    <Form.Text style={{ textAlign: "left" }} muted>Enter the start time in standard format. Ex (XX:XXAM/PM): 1:00PM, 4:00AM, 10:00PM</Form.Text>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="endTime">
                <Form.Label column sm={2}>
                    End Time
                </Form.Label>
                <Col sm={10}>
                    <Form.Control ref={endTimeRef} type="text" placeholder="Ex: 1:00PM" value={roomSlot.endTime} onChange={(e) => setRoomSlot({
                        ...roomSlot,
                        endTime: e.target.value
                    })} />
                    <Form.Control.Feedback style={{ textAlign: "left" }} type="invalid">
                        Please provide a valid end time in the correct format.
                    </Form.Control.Feedback>
                    <Form.Text style={{ textAlign: "left" }} muted>Enter the end time in standard format. Ex (XX:XXAM/PM): 1:00PM, 4:00AM, 10:00PM</Form.Text>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="dayOfWeek">
                <Form.Label column sm={2}>Day of Week</Form.Label>
                <Col sm={10} style = {{textAlign: 'left'}}>
                    <Form.Control as="select" onChange={handleDayOfWeekOnChange} >
                        {daysOfTheWeek.map((day) => {
                            return <option key={day} value={day}>{day}</option>;
                        })}
                    </Form.Control>
                    <Form.Control.Feedback style={{ textAlign: "left" }} type="invalid">
                        Please enter a valid day of week.
                    </Form.Control.Feedback>
                    <Form.Text style={{ textAlign: "left" }} muted>Please select a day of the week from the dropdown menu</Form.Text>
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

export default RoomSlotForm;