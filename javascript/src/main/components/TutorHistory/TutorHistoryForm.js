import React from "react";
import { Accordion, Button, Card, Table } from "react-bootstrap";

const TutorHistoryForm = ({ searchTutorHistoryByCourse, courseNumbers }) => {

  return (
    <>
    <Accordion>
      <Card>
        <Accordion.Toggle as={Button} variant="link" eventKey="0">
          <b>Click to Show/Hide All Courses with a Tutor Assigned</b>
          </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Course Number</th>
                </tr>
              </thead>
              <tbody>
                {courseNumbers && courseNumbers.map(courseNum => {
                  return (
                    <tr key={courseNum}>
                      <td>
                        <Button onClick={async () => await searchTutorHistoryByCourse({value: courseNum})}>
                          {courseNum}
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
    </>
  );
}

export default TutorHistoryForm;