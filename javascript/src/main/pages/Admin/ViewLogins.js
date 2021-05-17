import React from "react";
import useSWR from "swr";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchWithToken } from "main/utils/fetch";
import LoginTable from "main/components/Admin/LoginTable"


const ViewLogins = () => {
  const { getAccessTokenSilently: getToken } = useAuth0();
  const { data:loginTable } = useSWR(["/api/admin/logins", getToken], fetchWithToken);

  return (
    <>
      <h2 style={{ display: 'flex', justifyContent: 'left' }}>Login History</h2>
      <LoginTable loginTable={loginTable || []} admin={true}/>
    </>
  );
};

export default ViewLogins;