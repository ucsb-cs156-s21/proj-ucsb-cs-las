import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { Button } from "react-bootstrap";

export default ({loginTable}) => {
    const columns = [{
        dataField: 'timestamp',
        text: 'Timestamp'
    }, {
        dataField: 'email',
        text: 'Email'
    }, {
        dataField: 'firstName',
        text: 'First Name'
    }, {
        dataField: 'lastName',
        text: 'Last Name'
    }, {
        dataField: 'id',
        text: 'ID'
    }, {
        dataField: 'role',
        text: 'Role'
    }];

    return (
        <BootstrapTable keyField='timestamp' data={loginTable} columns={columns} />
    );
}