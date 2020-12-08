import React from "react";
import { useParams} from "react-router-dom";
import CourseDetail from "main/components/Courses/CourseDetail";


function CourseShow(){
	const history = useHistory();
  	const { getAccessTokenSilently: getToken } = useAuth0();
  	const { data: courseList, error, mutate: mutateCourses } = useSWR(
    	["/api/public/courses", getToken],
    	fetchWithToken
  	);
    const {courseId} = useParams();
    return(
        <CourseDetail courseId={courseId} />
    )
}

export default CourseShow;
