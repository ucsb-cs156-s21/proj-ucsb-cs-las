import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default ({ tutors, instructorTutors, admin, deleteTutor }) => {
  const history = useHistory();

  const renderEditButton = id => {
    const shouldRender =
      admin ||
      (instructorTutors &&
        instructorTutors.filter(tutor => tutor.id === id).length > 0);

    return (
      <div>
        {shouldRender && (
          <Button
            data-testid={`edit-button-${id}`}
            onClick={() => {
              history.push(`/tutors/edit/${id}`);
            }}
          >
            Edit
          </Button>
        )}
      </div>
    );
  };

  const renderDeleteButton = id => {
    const shouldRender =
      admin ||
      (instructorTutors &&
        instructorTutors.filter(tutor => tutor.id === id).length > 0);

    return (
      <div>
        {shouldRender && (
          <Button
            variant="danger"
            data-testid={`delete-button-${id}`}
            onClick={() => deleteTutor(id)}
          >
            Delete
          </Button>
        )}
      </div>
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

  columns.push({
    text: "Edit",
    isDummyField: true,
    dataField: "edit",
    formatter: (_cell, row) => renderEditButton(row.id)
  });
  columns.push({
    text: "Delete",
    isDummyField: true,
    dataField: "delete",
    formatter: (_cell, row) => renderDeleteButton(row.id)
  });

  return <BootstrapTable keyField="id" data={tutors} columns={columns} />;
};
