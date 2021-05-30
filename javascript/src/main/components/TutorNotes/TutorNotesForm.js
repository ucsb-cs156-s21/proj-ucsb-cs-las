import React, { useEffect, useState } from "react";
import { fetchWithToken } from "main/utils/fetch";
import useSWR from "swr";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "main/components/Loading/Loading";
import {asHumanQuarter} from "main/utils/quarter.ts"
import { FormControl, Form, Button, Row, Col } from "react-bootstrap";
import OfficeHoursSelector from "main/components/OfficeHours/OfficeHoursSelector";

const TutorNotesForm = ({ createTutorNotes, updateTutorNotes, existingTutorNotes }) => {
    const emptyTutorNotes = {
        id: null,
        officeHours: null,
        message: "Write message here"
    }

    const initialTutorNotes = (updateTutorNotes && existingTutorNotes) ? existingTutorNotes : emptyTutorNotes;

    const [tutorNotes, setTutorNotes] = useState(initialTutorNotes);
    const [officeHours, setOfficeHours] = useState({})

    const { getAccessTokenSilently: getToken } = useAuth0();

    const { data: officeHoursList, error } = useSWR(
        ["/api/member/officeHours/", getToken],
        fetchWithToken,
        {initialData:[]}
    );

    useEffect(() => {
        setOfficeHours(officeHoursList.length > 0 ? officeHoursList[0] : {});
      }, [officeHoursList]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (createTutorNotes){
            tutorNotes.officeHours = officeHours;
            console.log("tutorNotes = ", tutorNotes);
            console.log("officeHours = ", officeHours);
            createTutorNotes(tutorNotes);
        }
        else{
            updateTutorNotes(tutorNotes, tutorNotes.id);
        }
    }
    
    const onOfficeHoursChange = (i) => {
        console.log("office hours change i= " , i);
        console.log("office hours list = ", officeHoursList);
        setOfficeHours(officeHoursList[i]);
    }

    const tutorName = (tutorNotes) => {
        const firstName = tutorNotes?.officeHours?.tutorAssignment?.tutor?.firstName;
        const lastName = tutorNotes?.officeHours?.tutorAssignment?.tutor?.lastName;
        return firstName + " " + lastName;
    };

    const course = (tutorNotes) => {
        return tutorNotes?.officeHours?.tutorAssignment?.course?.name;
    };

    const quarter = (tutorNotes) => {
        const quarter = tutorNotes?.officeHours?.tutorAssignment?.course?.quarter;
        return quarter ? asHumanQuarter(quarter) : "";
    };


    return (
        <>
            {tutorNotes.index !== null ? 
            <Form onSubmit={handleOnSubmit}>
                {
                    createTutorNotes && <OfficeHoursSelector officeHours={officeHoursList} onChange={onOfficeHoursChange}/>
                 }
                 {
                    updateTutorNotes && <Row>
                        <Col>
                            <FormControl readOnly type="text" value={tutorName(tutorNotes)}/>
                        </Col>
                        <Col>
                            <FormControl readOnly type="text" value={course(tutorNotes)}/>
                        </Col>
                        <Col>
                            <FormControl readOnly type="text" value={quarter(tutorNotes)}/>
                        </Col>
                    </Row>
                 }
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