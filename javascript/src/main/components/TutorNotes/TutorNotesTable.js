import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default ({ tutorNotes, instructorTutors, admin, deleteTutorNotes }) => {
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
              history.push(`/tutorNotes/edit/${id}`);
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
            onClick={() => deleteTutorNotes(id)}
          >
            Delete
          </Button>
        )}
      </div>
    );
  };

  //function from 7pm-1 PR 139
  const sortCaret = (order, _column) => {
    const ascendingON = String.fromCharCode(0x25b2);
    const descendingON = String.fromCharCode(0x25bc);
    const ascendingOFF = String.fromCharCode(0x25b3);
    const descendingOFF = String.fromCharCode(0x25bd);

    if (!order)
      return (<span data-testid="sort">{descendingOFF}{ascendingOFF}</span>);
    else if (order === 'asc')
      return (<span data-testid="sort-asc">{descendingOFF}<font color="red">{ascendingON}</font></span>);
    else
      return (<span data-testid="sort-desc"><font color="red">{descendingON}</font>{ascendingOFF}</span>);

  }

  const columns = [
    {
      dataField: "id",
      text: "id",
      sort: true,
      sortCaret: sortCaret
    },
    {
      dataField: "course",
      text: "Course",
      sort: true,
      sortCaret: sortCaret
    },
    {
      dataField: "tutor",
      text: "Tutor",
      sort: true,
      sortCaret: sortCaret
    },
    {
      dataField: "message",
      text: "Message",
      sort: true,
      sortCaret: sortCaret
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

  return <BootstrapTable keyField="id" data={tutorNotes} columns={columns} />;
};