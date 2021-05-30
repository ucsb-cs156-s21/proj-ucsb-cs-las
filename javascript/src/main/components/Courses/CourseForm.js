import React, { useState, useRef } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import {checkEmail} from "main/utils/CourseFormHelpers";
import { checkCourseQuarter,checkFilled } from "main/utils/FormHelpers";
const CourseForm = ({ createCourse, updateCourse, existingCourse }) => {
    //const [validated, setValidated] = useState(false);
    const courseNameRef = useRef(null);
    const quarterRef = useRef(null);
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const emptyCourse = {
        name: "",
        quarter: "",
        instructorFirstName: "",
        instructorLastName: "",
        instructorEmail: "",
    }

    const [course, setCourse] = useState(existingCourse || emptyCourse);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        var isValid = checkInputs();
        //submit to actual create course
        //in create course API, if course repo already exists, fail
        if (isValid) {
            let quarterNum = "1";
            if(course.quarter.substr(0, 1)==="S"){
                quarterNum =  "2";
            }
            else if(course.quarter.substr(0, 1)==="M"){
                quarterNum =  "3";
            }
            else if(course.quarter.substr(0, 1)==="F"){
                quarterNum =  "4";
            }
            let formatedQuarter = "20" + course.quarter.substr(1, 2) + quarterNum;
            
            if (createCourse) {
                createCourse({...course, quarter: formatedQuarter});
            }
            else
                updateCourse({...course, quarter: formatedQuarter}, course.id);
        }
    }

    function checkInputs() {
        const validList = [];
        //check course name
        const courseNameValid = checkFilled(course.name);
        addFormEffects(courseNameRef, courseNameValid);
        validList.push(courseNameValid);

        //check valid quarter
        const quarterValid = checkCourseQuarter(course.quarter);
        addFormEffects(quarterRef, quarterValid);
        validList.push(quarterValid);

        //check first name
        const firstNameValid = checkFilled(course.instructorFirstName);
        addFormEffects(firstNameRef, firstNameValid);
        validList.push(firstNameValid);

        //check last name
        const lastNameValid = checkFilled(course.instructorLastName);
        addFormEffects(lastNameRef, lastNameValid);
        validList.push(lastNameValid);

        //check email
        const emailValid = checkEmail(course.instructorEmail);
        addFormEffects(emailRef, emailValid);
        validList.push(emailValid);

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




    return (
        <Form onSubmit={handleOnSubmit}>
            <Form.Group as={Row} controlId="name">
                <Form.Label column sm={2}>Course Name</Form.Label>
                <Col sm={10}>
                    <Form.Control ref={courseNameRef} type="text" placeholder="Ex: CMPSC 48" value={course.name} onChange={(e) => setCourse({
                        ...course,
                        name: e.target.value
                    })} />
                    <Form.Control.Feedback style={{ textAlign: "left" }} type="invalid">
                        Please provide a course.
                    </Form.Control.Feedback>
                    <Form.Text style={{ textAlign: "left" }} muted>Enter the course name as it is seen in GOLD. Ex: CMPSC 48</Form.Text>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="quarter">
                <Form.Label column sm={2}>
                    Quarter
                </Form.Label>
                <Col sm={10}>
                    <Form.Control ref={quarterRef} type="text" placeholder="Ex: F20" value={course.quarter} onChange={(e) => setCourse({
                        ...course,
                        quarter: e.target.value
                    })} />
                    <Form.Control.Feedback style={{ textAlign: "left" }} type="invalid">
                        Please provide a valid quarter.
                    </Form.Control.Feedback>
                    <Form.Text style={{ textAlign: "left" }} muted>Use the first name of the quarter with the last 2 digits of the year. Ex (2020): F20, W20, S20, M20</Form.Text>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="firstName">
                <Form.Label column sm={2}>First Name</Form.Label>
                <Col sm={10}>
                    <Form.Control ref={firstNameRef} type="text" placeholder="Ex: Joe" value={course.instructorFirstName} onChange={(e) => setCourse({
                        ...course,
                        instructorFirstName: e.target.value
                    })} />
                    <Form.Control.Feedback style={{ textAlign: "left" }} type="invalid">
                        Please provide a first name.
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="lastName">
                <Form.Label column sm={2}>
                    Last Name
                </Form.Label>
                <Col sm={10}>
                    <Form.Control ref={lastNameRef} type="text" placeholder="Ex: Gaucho" value={course.instructorLastName} onChange={(e) => setCourse({
                        ...course,
                        instructorLastName: e.target.value
                    })} />
                    <Form.Control.Feedback style={{ textAlign: "left" }} type="invalid">
                        Please provide a last name.
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="email">
                <Form.Label column sm={2}>
                    Email
                </Form.Label>
                <Col sm={10}>
                    <Form.Control ref={emailRef} type="email" placeholder="Ex: joegaucho@ucsb.edu" value={course.instructorEmail} onChange={(e) => setCourse({
                        ...course,
                        instructorEmail: e.target.value
                    })} />
                    <Form.Control.Feedback style={{ textAlign: "left" }} type="invalid">
                        Please provide a valid ucsb email.
                    </Form.Control.Feedback>
                    <Form.Text style={{ textAlign: "left" }} muted>Please use a UCSB email (@ucsb.edu NOT @umail.ucsb.edu). Ex: professor@ucsb.edu</Form.Text>
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

export default CourseForm;
