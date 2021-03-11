import React from "react";
import useSWR from "swr";
import { fetchWithToken, fetchWithoutToken } from "main/utils/fetch";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import Loading from "main/components/Loading/Loading";
import CourseDetail from "main/components/Courses/CourseDetail";
import CourseDetailOfficeHours from "../../components/Courses/CourseDetailOfficeHours";


function CourseShow() {
  const { courseId } = useParams();
  const { getAccessTokenSilently: getToken } = useAuth0();
  const { data: roleInfo } = useSWR(
    ["/api/myRole", getToken],
    fetchWithToken
  );
  let args = [`/api/public/courses/show/${courseId}`, fetchWithoutToken];
  let argsOfficeHours = [`/api/public/courses/officehours/${courseId}`, fetchWithoutToken]; 
  if (roleInfo) {
    args = roleInfo.role === "Member" || roleInfo.role === "Admin" ? [[`/api/member/courses/show/${courseId}`, getToken], fetchWithToken]
      : [`/api/public/courses/show/${courseId}`, fetchWithoutToken];
    argsOfficeHours = roleInfo.role === "Member" || roleInfo.role === "Admin" ? [[`/api/member/courses/officehours/${courseId}`, getToken], fetchWithToken]
    : [`/api/public/courses/officehours/${courseId}`, fetchWithoutToken];
  }
  const { data: viewList, error } = useSWR(...args);
  const { data: viewListOfficeHours, error: error2} = useSWR(...argsOfficeHours);
  if (error) {
    return (
      <h1>We encountered an error; please reload the page and try again.</h1>
    );
  }
  console.log(error2)
  if (error2) {
    return (
      <h1>We encountered an error; please reload the page and try again.</h1>
    );
  }
  if (!viewList) {
    return <Loading />;
  }


  return (
    <div>
     <CourseDetail member={roleInfo ? roleInfo.role === "Member" || roleInfo.role === "Admin" : false} viewList={viewList} />
     <CourseDetailOfficeHours member={roleInfo ? roleInfo.role === "Member" || roleInfo.role === "Admin" : false} viewListOfficeHours={viewListOfficeHours} /> 
    </div>

  )
}

export default CourseShow;
