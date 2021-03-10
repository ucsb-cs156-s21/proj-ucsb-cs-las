import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import useSWR from "swr";
import { fetchWithoutToken } from "main/utils/fetch";
import fromFormat from "main/utils/FromFormat";

export default ({courses}) => {

    const { data: filter } = useSWR(
        "/api/public/filter",
        fetchWithoutToken
    );

    if (filter && courses && filter.length > 0 && filter[0].activeQuarter !== "All") {
            courses = courses.filter((course) => course.quarter === filter[0].activeQuarter);
    }

    
    const columns = [{
        dataField: 'id',
        text: 'id'
    }, {
        dataField: 'name',
        text: 'Course Number',
    }, {
        dataField: 'quarter',
        text: 'Quarter',
        formatter: (_cell, row) => fromFormat(row.quarter)
    }];

    return (
        <BootstrapTable keyField='id' data={courses} columns={columns} />
    );
}
