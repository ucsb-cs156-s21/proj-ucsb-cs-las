import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import Loading from "main/components/Loading/Loading";

export default ({member,viewListOfficeHours=[]}) => {

    const column3 = [{
        dataField: 'onlineOfficeHours[0].dayOfWeek',
        text: 'Day of Week'
    }, {
        dataField: 'tutorAssignment.id',
        text: 'Tutor Assignment Id'
    }, {
        dataField: 'tutorAssignment.tutor.firstName',
        text: 'Tutor First Name'
    }, {
        dataField: 'tutorAssignment.tutor.lastName',
        text: 'Tutor Last Name'
    }, {
        dataField: 'onlineOfficeHours[0].startTime',
        text: 'Start Time'
    }, {
        dataField: 'onlineOfficeHours[0].endTime',
        text: 'End Time'
    }];


    if (member) {
        column3.push({
            text: "Email",
            dataField: "tutorAssignment.tutor.email",
        });
        column3.push({
            text: "Zoom Room Link",
            dataField: "onlineOfficeHours[0].zoomRoomLink",
        });
    }

    if(!viewListOfficeHours){
        return <Loading />
    }
    
    return (
        <div>
            <BootstrapTable keyField='dayOfWeek' data={viewListOfficeHours} columns={column3} />
        </div>
    );
}