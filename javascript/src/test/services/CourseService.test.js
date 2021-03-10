import { buildCreateCourse, buildDeleteCourse, buildUpdateCourse } from "main/services/Courses/CourseService";
import uploadCoursesCSV from "main/services/Courses/UploadCsv";

import { fetchWithToken } from "main/utils/fetch";

jest.mock("main/utils/fetch", () => ({
    fetchWithToken:  jest.fn()
}));

describe("CourseService tests", () => {

    const getToken = jest.fn();
    const onSuccess = jest.fn(); 
    const onError = jest.fn();

    beforeEach( () => {
        jest.clearAllMocks();
    });

    test("buildCreateCourse and invoke createCourse", async () => {
        const createCourse = buildCreateCourse(getToken, onSuccess, onError);
        await createCourse();
        expect(onSuccess).toBeCalledTimes(1);
    });
    test("buildUpdateCourse and invoke updateCourse", async () => {
        const updateCourse = buildUpdateCourse(getToken, onSuccess, onError);
        await updateCourse();
        expect(onSuccess).toBeCalledTimes(1);
    });
    test("buildDeleteCourse and invoke deleteCourse", async () => {
        const deleteCourse = buildDeleteCourse(getToken, onSuccess, onError);
        await deleteCourse();        
        expect(onSuccess).toBeCalledTimes(1);
    });
    test("uploadCoursesCSV and invoke deleteStudent", async () => {
        const uploadCourses = uploadCoursesCSV(getToken, onSuccess, onError);
        await uploadCourses();        
        expect(onSuccess).toBeCalledTimes(1);
    });

    test("buildCreateCourse where we expect onError to be called", async () => {
        fetchWithToken.mockImplementation( async () => { throw new Error("mock error"); } );
        const createCourse = buildCreateCourse(getToken, onSuccess, onError);
        await createCourse();
        expect(onError).toBeCalledTimes(1);
    });

    test("buildUpdateCourse where we expect onError to be called", async () => {
        fetchWithToken.mockImplementation( async () => { throw new Error("mock error"); } );
        const updateCourse = buildUpdateCourse(getToken, onSuccess, onError);
        await updateCourse();
        expect(onError).toBeCalledTimes(1);
    });

    test("buildDeleteCourse where we expect onError to be called", async () => {
        fetchWithToken.mockImplementation( async () => { throw new Error("mock error"); } );
        const deleteCourse = buildDeleteCourse(getToken, onSuccess, onError);
        await deleteCourse();
        expect(onError).toBeCalledTimes(1);
    });

    test("uploadCoursesCSV where we expect onError to be called", async () => {
        fetchWithToken.mockImplementation( async () => { throw new Error("mock error"); } );
        const uploadCourses = uploadCoursesCSV(getToken, onSuccess, onError);
        await uploadCourses();
        expect(onError).toBeCalledTimes(1);
    });
});
