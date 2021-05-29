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
        message: "Write message here"
    }

    const [existingSet, setExistingSet] = useState(false);
    const [tutorNotes, setTutorNotes] = useState(emptyTutorNotes);

    if(existingTutorNotes && !existingSet){
        setTutorNotes({course: existingTutorNotes.course, 
            tutor: existingTutorNotes.tutor,
            message: existingTutorNotes.message, 
            id: existingTutorNotes.id});
        setExistingSet(true);
    }

    const { getAccessTokenSilently: getToken } = useAuth0();

    const { data: courseList, error } = useSWR(
        ["/api/member/courses/", getToken],
        fetchWithToken
    );

    const { data: tutorList, error2 } = useSWR(
        ["/api/member/tutors/", getToken],
        fetchWithToken
    );


    let sortedListc;
    let sortedListt;
    if (error || error2) {
        return (
            <>
            <h1>You must be an instructor or an admin to create new Tutor Notes or we have found no Courses/Tutors.</h1>
            </>
        );
    }
    if (!courseList || !tutorList) {
        return <Loading />;
    }
    else {
        sortedListc = courseList.map((course, index) => <option key={index} value={index}>{course.name+" "+asHumanQuarter(course.quarter)}</option>);
        if(tutorNotes.course === null){
            setTutorNotes({...tutorNotes, course: courseList[0], index: 0});
        }
        sortedListt = tutorList.map((tutor, index) => <option key={index} value={index}>{tutor.firstName+" "+tutor.lastName}</option>);
        if(tutorNotes.tutor === null){
            setTutorNotes({...tutorNotes, tutor: tutorList[0]});
        }
    }

    
    if(existingTutorNotes && tutorNotes.index === null){
        for (let i = 0; i < courseList.length; i++) {
            if (courseList[i].id === existingTutorNotes.course.id) {
                setTutorNotes({...tutorNotes, index: i});
            }
        }
        for (let i = 0; i < tutorList.length; i++) {
            if (tutorList[i].id === existingTutorNotes.tutor.id) {
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
                            ...tutorNotes, course: courseList[e.target.value]})}>
                            {sortedListc}
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="tutorEmail">
                    <Form.Label column sm={2}>
                        Tutor
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control as="select" value={tutorNotes.index} onChange={(e) => setTutorNotes({ 
                            ...tutorNotes, tutor: tutorList[e.target.value]})}>
                            {sortedListt}
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="message">
                    <Form.Label column sm={2}>Message</Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" placeholder="Write note here" onChange={(e) => setTutorNotes({ 
                            ...tutorNotes, message: e.target.value})}/>
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