  
import React from "react";
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import { useHistory } from "react-router-dom";

export default ({courses}) => {
    const history = useHistory();

    const cellFormatter = (id, name) => {
        const link = `/courses/show/${id}`
        return (  
        //     <Link 
        //     to={{
        //     pathname: `/courses/show/${id}`,
        //     data :id
        // }}>{name}</Link>  
        //<div><a href="/course/show/${id}">{name}</a></div>
            //<div><Link to={{pathname: `/courses/show/${id}`, data :id}}>{name}</Link></div>
            <a href={link}>{name}</a>
        )
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