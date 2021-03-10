import React from "react";
import { render } from "@testing-library/react";
import TutorTable from "main/components/Tutor/TutorTable";
import userEvent from "@testing-library/user-event";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

describe("TutorForm tests", () => {
  test("renders without crashing admin false", () => {
    
    const tutorList = [];
    const instructorTutorList = [];
    const isAdmin = false;
    const deleteTutor = jest.fn();

    render(<TutorTable
        tutors={tutorList}
        instructorTutors={instructorTutorList}
        admin={isAdmin}
        deleteTutor={deleteTutor}
      />);
  });

  test("renders with edit/delete buttons when admin true", () => {
    
    const tutorList = [
        {
            id: 1,
            firstName: 'Long', 
            lastName: 'Hoang',
            email: 'lh@ucsb.edu'
        },

        {
            id: 2,
            firstName: 'Long', 
            lastName: 'Hoang',
            email: 'lh@ucsb.edu'
        }
    ];
    const instructorTutorList = [];
    const isAdmin = true;
    const deleteTutor = jest.fn();

    const { getByTestId } = render(
    <Router history={createMemoryHistory()}>
        <TutorTable
            tutors={tutorList}
            instructorTutors={instructorTutorList}
            admin={isAdmin}
            deleteTutor={deleteTutor}
        />
    </Router>
      );

    const deleteButton = getByTestId('delete-button-1');  
    expect(deleteButton).toBeInTheDocument();
    userEvent.click(deleteButton);


    const editButton = getByTestId('edit-button-2');
    expect(editButton).toBeInTheDocument();
    userEvent.click(editButton);

  });

  test("renders without crashing admin false / instructorTutorList exist", () => {
    
    const tutorList = [

        {
            id: 1,
            firstName: 'Long', 
            lastName: 'Hoang',
            email: 'lh@ucsb.edu'
        },

        {
            id: 2,
            firstName: 'Long', 
            lastName: 'Hoang',
            email: 'lh@ucsb.edu'
        }

    ];

    

    const instructorTutorList = [

        {
            id: 2,
            firstName: 'Long', 
            lastName: 'Hoang',
            email: 'lh@ucsb.edu'
        }

    ];
    const isAdmin = false;
    const deleteTutor = jest.fn();

    render(<TutorTable
        tutors={tutorList}
        instructorTutors={instructorTutorList}
        admin={isAdmin}
        deleteTutor={deleteTutor}
      />);
  });

});