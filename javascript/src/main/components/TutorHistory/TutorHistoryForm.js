import React from "react";
import { Accordion, Button, Card, Table } from "react-bootstrap";
import useSWR from "swr";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchWithToken } from "main/utils/fetch";

const TutorHistoryForm = ({ searchTutorHistoryByCourse }) => {
  const { getAccessTokenSilently: getToken } = useAuth0();
  const { data: courseNumbers } = useSWR(["/api/public/tutorAssignment/course_numbers", getToken], fetchWithToken);

  return (
    <>
    <Accordion>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          Click to Show/Hide All Courses with a Tutor Assigned
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