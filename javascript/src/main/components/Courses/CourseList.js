import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { useHistory } from "react-router-dom";
import {Link } from "react-router-dom";

export default ({courses}) => {
    const history = useHistory();

    const cellFormatter = (id, name) => {
        return (
            <div>    
        <li>
            <Link 
            to={{
            pathname: "/tutorPage",
            data: id
        }}>{name}</Link>
            </li>    
            </div>
        );
    }

    const columns = [{
        dataField: 'id',
        text: 'id'
    }, {
        dataField: 'name',
        text: 'Course Number',
        formatter: (cell, row) => cellFormatter(row.id, row.name)
    }, {
        dataField: 'quarter',
        text: 'Quarter'
    }];

    return (
        <BootstrapTable keyField='id' data={courses} columns={columns} />
    );
}