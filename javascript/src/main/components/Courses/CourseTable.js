import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';

const columns = [{
    dataField: 'id',
    text: 'id'
}, {
    dataField: 'name',
    text: 'Course Number'
}, {
    dataField: 'quarter',
    text: 'Quarter'
}, {
    dataField: 'instructorFirstName',
    text: 'First'
}, {
    dataField: 'instructorLastName',
    text: 'Last'
}, {
    dataField: 'instructorEmail',
    text: 'Email'
}];


export default (props) =>
    <BootstrapTable keyField='id' data={props.courses} columns={columns} />
