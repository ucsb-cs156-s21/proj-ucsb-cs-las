import React, { useState } from "react";
import { fetchWithToken } from "main/utils/fetch";
import useSWR from "swr";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "main/components/Loading/Loading";
import {asHumanQuarter} from "main/utils/quarter.ts"
import { Form, Button, Row, Col } from "react-bootstrap";

const TutorNotesForm = ({ createTutorNotes, updateTutorNotes, existingTutorNotes }) => {
    const emptyTutorNotes = {
        id: null,
        course: null,
        tutor: null,
        message: "Random Message"
    }

    const [existingSet, setExistingSet] = useState(false);
    const [tutorNotes, setTutorNotes] = useState(emptyTutorNotes);

    if(existingTutorNotes && !existingSet){
        setTutorNotes({course: existingTutorNotes.course, 
            tutor: existingTutorNotes.tutor,
            tutorEmail: existingTutorNotes.tutor.email, 
            message: existingTutorNotes.message, 
            id: existingTutorNotes.id});
        setExistingSet(true);
    }

    const { getAccessTokenSilently: getToken } = useAuth0();
    const { data: courseList, error } = useSWR(
        ["/api/member/courses/", getToken],
        fetchWithToken
    );

    let sortedList;
    if (error) {
        return (
            <>
            <h1>You must be an instructor or an admin to create new Tutor Notes.</h1>
            </>
        );
    }
    if (!courseList) {
        return <Loading />;
    }
    else {
        sortedList = courseList.map((course, index) => <option key={index} value={index}>{course.name+" "+asHumanQuarter(course.quarter)}</option>);
        if(tutorNotes.course === null){
            setTutorNotes({...tutorNotes, course: courseList[0], index: 0});
        }
    }

    
    if(existingTutorNotes && tutorNotes.index === null){
        for (var i = 0; i < courseList.length; i++) {
            if (courseList[i].id === existingTutorNotes.course.id) {
                setTutorNotes({...tutorNotes, index: i});
            }
        }
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (createTutorNotes){
            createTutorNotes(tutorNotes);
        }
        else{
            updateTutorNotes(tutorNotes, tutorNotes.id);
        }
    }

    return (
        <>
            {tutorNotes.index !== null ? 
            <Form onSubmit={handleOnSubmit}>
                <Form.Group as={Row} controlId="courseName">
                    <Form.Label column sm={2}>Course Name</Form.Label>
                    <Col sm={10}>
                        <Form.Control as="select" value={tutorNotes.index} onChange={(e) => setTutorNotes({ 
                            ...tutorNotes, course: courseList[e.target.value], index: e.target.value})}>
                            {sortedList}
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="tutorEmail">
                    <Form.Label column sm={2}>
                        Tutor Email
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" placeholder="tutor email" value={tutorNotes.tutor} onChange={(e) => setTutorNotes({
                            ...tutorNotes,
                            tutor: e.target.value
                        })} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="message">
                    <Form.Label column sm={2}>Message</Form.Label>
                    <Col sm={10}>
                        <Form.Control as="text" value={tutorNotes.message} onChange={(e) => setTutorNotes({ 
                            ...tutorNotes, message: e.target.value})}>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button type="submit">Submit</Button>
                    </Col>
                </Form.Group>
            </Form>
            :
            <Loading />}
        </>
    );
};

export default TutorNotesForm;