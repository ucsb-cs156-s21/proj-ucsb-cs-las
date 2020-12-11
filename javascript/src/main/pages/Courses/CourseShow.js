import React from "react";
import useSWR from "swr";
import { fetchWithToken, fetchWithoutToken } from "main/utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import Loading from "main/components/Loading/Loading";
import CourseDetail from "main/components/Courses/CourseDetail";

import { useHistory } from "react-router-dom";

function CourseShow() {
  const history = useHistory();
  const { courseId } = useParams();
  const { getAccessTokenSilently: getToken } = useAuth0();
  const { data: roleInfo } = useSWR(
    ["/api/myRole", getToken],
    fetchWithToken
  );
  let args = [`/api/public/courses/show/${courseId}`, fetchWithoutToken];
  if (roleInfo) {
    args = roleInfo.role === "Member" || roleInfo.role === "Admin" ? [[`/api/member/courses/show/${courseId}`, getToken], fetchWithToken]
      : [`/api/public/courses/show/${courseId}`, fetchWithoutToken];

  }
  const { data: viewList, error } = useSWR(...args);
  if (error) {
    return (
      <h1>We encountered an error; please reload the page and try again.</h1>
    );
  }
  if (!viewList) {
    return <Loading />;
  }
  return (
    <CourseDetail member={roleInfo ? roleInfo.role === "Member" || roleInfo.role === "Admin" : false} viewList={viewList} />
  )
}

export default CourseShow;