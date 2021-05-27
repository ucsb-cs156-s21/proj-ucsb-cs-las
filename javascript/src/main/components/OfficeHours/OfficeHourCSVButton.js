import React, { useState } from "react";
import {Button, Col, Row, Container, Form} from "react-bootstrap";

var OfficeHourCSVButton = ({ addTask }) => {
    const [_value, setValue] = useState("");
    const [file, setFile] = React.useState(null);
    const fileRef = React.useRef();
    return (
        <form
            onSubmit={async (event) => {
                event.preventDefault();
                console.log(file);
                try{
                    await addTask(file);
                } catch(error){
                    console.log("Caught error");
                }
                fileRef.current.value = "";
                setFile(null);
                setValue("");
            }}
        >
            <Container fluid>
                <Row style={{paddingTop: 14}}>
                    <Col xs={11} style={{ padding: 0 }}>
                        <Form.Group>
                            <Form.File
                                type="file"
                                accept=".csv"
                                id="custom-file-input"
                                label="Upload a CSV of OfficeHours, format: Course, quarter, Instructor's first name, Instructor's last name, instructor's email, Tutor's First name, Tutor's last name, Tutor's email, Tutor's position, Day of the week, Start time, End time, zoom link, note"
                                data-testid="csv-input"
                                custom
                                onChange={event => {setFile(event.currentTarget.files[0])}}
                                ref={fileRef}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={1} style={{ padding: 0 }}>
                        <Button type="submit">Submit</Button>
                    </Col>
                </Row>
            </Container>
        </form>
    );
};

export default OfficeHourCSVButton;
