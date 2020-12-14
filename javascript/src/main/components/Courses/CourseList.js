import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { useHistory } from "react-router-dom";
import useSWR from "swr";
import { fetchWithoutToken } from "main/utils/fetch";


export default ({courses}) => {
    const history = useHistory();

    const { data: filter } = useSWR(
        "/api/public/filter",
        fetchWithoutToken
    );

    if (filter && courses && filter.length > 0 && filter[0].activeQuarter !== "All") {
            courses = courses.filter((course) => course.quarter === filter[0].activeQuarter);
    }

    const cellFormatter = (id, name) => {
        const link = `/courses/show/${id}`
        return (  
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