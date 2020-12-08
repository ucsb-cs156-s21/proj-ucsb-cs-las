import React from "react";
import { Table, Button, Badge } from "react-bootstrap";
import useSWR from "swr";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchWithToken } from "main/utils/fetch";
import LoginTable from "main/components/Admin/LoginTable"

import Loading from "main/components/Loading/Loading";
import { buildCreateCourse, buildDeleteCourse, buildUpdateCourse } from "main/services/Courses/CourseService";



const ViewLogins = () => {
  const { getAccessTokenSilently: getToken } = useAuth0();
  // Fetch real data here
  const { data:loginTable } = useSWR(["/api/admin/logins", getToken], fetchWithToken);

  console.log("loginTable = ", loginTable);
  // if (!loginTable) {  //Shows loading screen if logintable isn't ready, or doesn't exist yet
  //   return <Loading />;
  // }


  // Below is fake data for front end testing
  // const loginTable = [
  //   { timestamp: "8:50", email: "matthew_wong@ucsb.edu", firstName: "Matthew", lastName: "Wong", id: "12345", role: "Admin"},
  //   { timestamp: "9:00", email: "test_user@ucsb.edu", firstName: "test", lastName: "user", id: "98765", role: "User" },
  // ]

  return (
    <>
      <LoginTable loginTable={loginTable || []} admin={true}/>
    </>
  );
};

export default ViewLogins;