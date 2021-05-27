import React from "react";
import useSWR from "swr";
import { Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchWithToken } from "main/utils/fetch";
import LoginTable from "main/components/Admin/LoginTable"
import { CSVLink } from "react-csv";


const headers = [{
  key: 'timestamp',
  label: 'Timestamp'
}, {
  key: 'email',
  label: 'Email'
}, {
  key: 'firstName',
  label: 'First'
}, {
  key: 'lastName',
  label: 'Last'
}];

const ViewLogins = () => {
  const { getAccessTokenSilently: getToken } = useAuth0();
  const { data:loginTable } = useSWR(["/api/admin/logins", getToken], fetchWithToken);

  if (loginTable){
    var size = loginTable.length;
  }

  return (
    <>
      <h2 className="text-left">Login History</h2>
      <Button><CSVLink style={{color: "white"}} headers={headers} data={loginTable || []} filename = {"LoginTable.csv"}>Download CSV</CSVLink></Button>
      <p className="text-left">Number of logins: {size}</p>
      <LoginTable loginTable={loginTable || []} admin={true}/>
    </>
  );
};

export default ViewLogins;