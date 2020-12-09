import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';

export default ({tutorList, member}) => {

    const columns = [{
        dataField: 'first_name',
        text: 'First Name'
    },{
        dataField: 'last_name',
        text: 'Last Name'
    }];

    if (member) {
        columns.push({
            dataField: 'email',
            text: 'Email'
        });
    }

    return (
        <BootstrapTable keyField = 'id' data = {tutorList} columns = {columns} />
    );
}