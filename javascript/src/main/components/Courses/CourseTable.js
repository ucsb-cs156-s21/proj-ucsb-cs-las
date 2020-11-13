import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';

const courses = [{"id":1,"name":"CMPSC 156","quarter":"F20","instructorFirstName":"Phill","instructorLastName":"Conrad","instructorEmail":"phtcon@ucsb.edu"}];
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

export default () =>
    <BootstrapTable keyField='id' data={courses} columns={columns} />
