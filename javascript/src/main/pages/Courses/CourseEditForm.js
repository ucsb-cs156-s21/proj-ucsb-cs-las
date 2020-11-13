import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";




const CourseEditForm = ({ item, update }) => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(item.name);
  const [quarter, setQuarter] = useState(item.quarter);
  const [instructorFirstName, setInstructorFirstName] = useState(item.instructorFirstName);
  const [instructorLastName, setInstructorLastName] = useState(item.instructorLastName);
  const [instructorEmail, setInstructorEmail] = useState(item.instructorEmail);

  const buttonName = editMode ? "Done" : "Edit";
  // const textDecoration = !editMode && item.done ? "line-through" : "none";

  const handleOnClickOrSubmit = (event) => {
    event.preventDefault();
    if (name.trim().length === 0 || quarter.trim().length === 0 || instructorFirstName.trim().length === 0 || instructorLastName.trim().length === 0 || instructorEmail.trim().length === 0) {
      return;
    }
    if (editMode) {
      const updatedItem = {
        ...item,
        name,
        quarter,
        instructorFirstName,
        instructorLastName,
        instructorEmail,
      };
      update(updatedItem, updatedItem.id);
    }
    setEditMode(!editMode);
  };

  return (
    <Form inline onSubmit={handleOnClickOrSubmit}>
      <Form.Control
        style={{ width: "30%" }}
        type="text"
        placeholder="edit course name"
        readOnly={!editMode}
        plaintext={!editMode}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Form.Control
        style={{ width: "10%" }}
        type="text"
        placeholder="edit quarter"
        readOnly={!editMode}
        plaintext={!editMode}
        value={quarter}
        onChange={(e) => setQuarter(e.target.value)}
      />
      <Form.Control
        style={{ width: "15%" }}
        type="text"
        placeholder="edit fname"
        readOnly={!editMode}
        plaintext={!editMode}
        value={instructorFirstName}
        onChange={(e) => setInstructorFirstName(e.target.value)}
      />
      <Form.Control
        style={{ width: "15%" }}
        type="text"
        placeholder="edit lname"
        readOnly={!editMode}
        plaintext={!editMode}
        value={instructorLastName}
        onChange={(e) => setInstructorLastName(e.target.value)}
      />
      <Form.Control
        style={{ width: "20%" }}
        type="text"
        placeholder="email"
        readOnly={!editMode}
        plaintext={!editMode}
        value={instructorEmail}
        onChange={(e) => setInstructorEmail(e.target.value)}
      />
      <Button onClick={handleOnClickOrSubmit}>{buttonName}</Button>
    </Form>
  );
};

export default CourseEditForm;
