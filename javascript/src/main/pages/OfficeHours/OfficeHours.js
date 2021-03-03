import React from "react";
import useSWR from "swr";
import { Button } from "react-bootstrap";
import { fetchWithToken } from "main/utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "main/components/Loading/Loading";
import OfficeHourTable from "main/components/OfficeHours/OfficeHourTable"
import { buildDeleteOfficeHour, buildCreateOfficeHour } from "main/services/OfficeHours/OfficeHourService";
import {useHistory} from "react-router-dom";


const OfficeHours = () => {


  const history = useHistory();
  const { getAccessTokenSilently: getToken } = useAuth0();
  const { data: officeHourList, error, mutate: mutateOfficeHours } = useSWR(
    ["/api/public/officeHours", getToken],
    fetchWithToken
  );
  if (error) {
    return (
      <h1>We encountered an error; please reload the page and try again.</h1>
    );
  }
  if (!officeHourList) {
    return <Loading />;
  }
  const deleteOfficeHour = buildDeleteOfficeHour(getToken, mutateOfficeHours);

  return (
    <>
      <Button style={{marginBottom: "1em"}} onClick={()=>history.push("/officehours/new")} >New Office Hour</Button>
      <OfficeHourTable officeHours={officeHourList} admin={true} deleteOfficeHour={deleteOfficeHour}  />
    </>
  );
};

export default OfficeHours;
