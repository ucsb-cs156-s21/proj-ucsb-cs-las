import React, { useState } from "react"; 
import { Button, Col, Row, Container, Form } from "react-bootstrap"; 

export const TutorCSVButton = ({ addTask }) => {
    const [value, setValue] = useState(""); 
    const [file, setFile] = React.useState(null); 
    const fileRef = React.useRef(); 
    return (
        <form
            onSubmit={async (event) => {
                event.preventDefault();
                await addTask(file);
        
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
                                label= { value }
                                data-testid="csv-input"
                                custom
                                onChange={event => {
                                    setFile(event.currentTarget.files[0]);
                                    setValue(event.currentTarget.files[0].name)
                                }}
                                ref={fileRef}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={1} style={{ padding: 0 }}>
                        <Button type="submit">Upload</Button>
                    </Col>
                </Row>
            </Container>
        </form>
    )
};
