import React from "react";
import { render } from "@testing-library/react";
import AppFooter from "main/components/Footer/AppFooter";
import { buildCreateCourse, buildDeleteCourse, buildUpdateCourse } from "main/services/Courses/CourseService";


describe("CourseService tests", () => {
    const getToken = jest.fn();
    const mutateCourses = jest.fn();
    test("buildCreateCourse", () => {
        const createCourse = buildCreateCourse(getToken, mutateCourses);
    });
    test("buildUpdateCourse", () => {
        const updateCourse = buildUpdateCourse(getToken, mutateCourses);
    });
    test("buildDeleteCourse", () => {
        const deleteCourse = buildDeleteCourse(getToken, mutateCourses);
    });
});
