import React, { useState } from "react";
import { fetchWithToken } from "main/utils/fetch";
import useSWR from "swr";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "main/components/Loading/Loading";
import {asHumanQuarter} from "main/utils/quarter.ts"
import { Form, Button, Row, Col, Container } from "react-bootstrap";

const TutorAssignmentForm = ({ createTutorAssignment, updateTutorAssignment, existingTutorAssignment }) => {
    const emptyTutorAssignment = {
        course: null,
        tutorEmail: "",
        assignmentType: "LA",
    }

    const [tutorAssignment, setTutorAssignment] = useState(existingTutorAssignment || emptyTutorAssignment);

    const { getAccessTokenSilently: getToken } = useAuth0();
    const { data: courseList, error, mutate: mutateCourse } = useSWR(
        ["/api/member/courses/", getToken],
        fetchWithToken
    );

    let sortedList;
    if (error) {
        return (
            <>
            <h1>You must be an instructor or an admin to create new Tutor Assignments.</h1>
            </>
        );
    }
    if (!courseList) {
        return <Loading />;
    }
    else{
        sortedList = courseList.map((course, index) => <option key={index} value={index}>{course.name+" "+asHumanQuarter(course.quarter)}</option>)
        if(tutorAssignment.course === null){
            setTutorAssignment({...tutorAssignment, course: courseList[0]});
        }
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        createTutorAssignment(tutorAssignment);
        // if (createTutorAssignment){
        //     createTutorAssignment(tutorAssignment);
        // }
        // else{
        //     updateTutorAssignment(tutorAssignment);
        // }
    }

    return (
        <Form onSubmit={handleOnSubmit}>
            <Form.Group as={Row} controlId="courseName">
                <Form.Label column sm={2}>Course Name</Form.Label>
                <Col sm={10}>
                    <Form.Control as="select" onChange={(e) => setTutorAssignment({ 
                        ...tutorAssignment, course: courseList[e.target.value]})}>
                        {sortedList}
                    </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="tutorEmail">
                <Form.Label column sm={2}>
                    Tutor Email
                </Form.Label>
                <Col sm={10}>
                    <Form.Control type="text" placeholder="tutor email" value={tutorAssignment.tutorEmail} onChange={(e) => setTutorAssignment({
                        ...tutorAssignment,
                        tutorEmail: e.target.value
                    })} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="assignmentType">
                <Form.Label column sm={2}>Assignment Type</Form.Label>
                <Col sm={10}>
                    <Form.Control as="select" value={tutorAssignment.assignmentType} onChange={(e) => setTutorAssignment({ 
                        ...tutorAssignment, assignmentType: e.target.value})}>
                        <option value="LA">LA</option>
                        <option value="190J">190J</option>
                        <option value="TA">TA</option>
                    </Form.Control>
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

export default TutorAssignmentForm;
