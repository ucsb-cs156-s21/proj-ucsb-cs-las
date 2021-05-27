import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';

export default ({_member,viewList=[]}) => {

    const column2 = [{
        dataField: 'tutorAssignment.id',
        text: 'Tutor Assignment Id'
    }, {
        dataField: 'tutorAssignment.tutor.firstName',
        text: 'Tutor First Name'
    }, {
        dataField: 'tutorAssignment.tutor.lastName',
        text: 'Tutor Last Name'
    } ];


    return (
        <div>
            <BootstrapTable keyField='id' data={viewList} columns={column2} />
        </div>
    );
}