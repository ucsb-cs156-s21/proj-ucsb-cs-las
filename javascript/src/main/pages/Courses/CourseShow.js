import React from "react";
import { useParams} from "react-router-dom";
import CourseDetail from "main/components/Courses/CourseDetail";


function CourseShow(){
    const history = useHistory();
    const {courseId} = useParams();
    const { user, getAccessTokenSilently: getToken } = useAuth0();
    const { name, picture, email } = user;
    const { data: roleInfo } = useSWR(
    ["/api/myRole", getToken],
    fetchWithToken
    );
    const endpoint = roleInfo && roleInfo.role === "member" || roleInfo.role === "admin" ? "/api/member" : "/api/public";
    const { data: viewList, error} = useSWR([endpoint, getToken], fetchWithToken);
    if (error) {
        return (
          <h1>We encountered an error; please reload the page and try again.</h1>
        );
      }
    if (!viewList) {
        return <Loading />;
    }
    return(
        <CourseDetail Member = {Member} viewList={viewList}/>
    )
}

export default CourseShow;