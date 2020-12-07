import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import useSWR from "swr";
import { fetchWithToken } from "main/utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";

import { buildDeleteTutor } from "main/services/Tutor/TutorService";

export default ({ tutors, admin, deleteTutor }) => {
  const history = useHistory();
  const { getAccessTokenSilently: getToken } = useAuth0();
  const { data: roleInfo } = useSWR(["/api/myRole", getToken], fetchWithToken);

  const renderEditButton = id => {
    return (
      <Button
        data-testid="edit-button"
        onClick={() => {
          history.push(`/tutors/edit/${id}`);
        }}
      >
        Edit
      </Button>
    );
  };

  const renderDeleteButton = id => {
    return (
      <Button
        variant="danger"
        data-testid="delete-button"
        onClick={() => deleteTutor(id)}
      >
        Delete
      </Button>
    );
  };

  const columns = [
    {
      dataField: "id",
      text: "id"
    },
    {
      dataField: "firstName",
      text: "First Name"
    },
    {
      dataField: "lastName",
      text: "Last Name"
    },
    {
      dataField: "email",
      text: "Email"
    }
  ];

  const isInstructor = roleInfo && roleInfo.role.toLowerCase() == "instructor";

  const { data: tutorAssignments } = useSWR(
    ["/api/member/tutorAssignments/", getToken],
    fetchWithToken
  );

  if (admin) {
    columns.push({
      text: "Edit",
      isDummyField: true,
      dataField: "edit",
      formatter: (cell, row) => renderEditButton(row.id)
    });
    columns.push({
      text: "Delete",
      isDummyField: true,
      dataField: "delete",
      formatter: (cell, row) => renderDeleteButton(row.id)
    });
  }

  return <BootstrapTable keyField="id" data={tutors} columns={columns} />;
};
