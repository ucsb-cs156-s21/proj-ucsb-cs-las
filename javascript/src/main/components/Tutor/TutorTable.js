import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { buildDeleteTutor } from "main/services/Tutor/TutorService";

export default ({ tutors, admin, deleteTutor }) => {
  const history = useHistory();

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
