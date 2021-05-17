import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';

export default ({loginTable}) => {
    const columns = [{
        dataField: 'timestamp',
        text: 'Timestamp',
        sort: true,
    }, {
        dataField: 'email',
        text: 'Email',
        sort: true,
    }, {
        dataField: 'firstName',
        text: 'First Name',
        sort: true,
    }, {
        dataField: 'lastName',
        text: 'Last Name',
        sort: true,
    }];

    return (
         <BootstrapTable 
         bootstrap4={true}
        keyField='timestamp' 
        data={loginTable} 
        columns={columns} 
        striped 
        />

    );
}
