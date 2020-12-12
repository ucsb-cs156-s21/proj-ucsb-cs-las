import { checkCourseQuarter, checkEmail } from "main/utils/CourseFormHelpers";

describe("course form helpers test", () => {
    describe("checkCourseQuarter", () => {
        test("good quarters", () => {
            expect(checkCourseQuarter("F20")).toBe(true);
            expect(checkCourseQuarter("W20")).toBe(true);
            expect(checkCourseQuarter("S20")).toBe(true);
            expect(checkCourseQuarter("M20")).toBe(true);
        });

        test("bad quarters", () => {
            expect(checkCourseQuarter("X20")).toBe(false);
            expect(checkCourseQuarter("FFF")).toBe(false);
            expect(checkCourseQuarter("S2020")).toBe(false);
            expect(checkCourseQuarter("Summer20")).toBe(false);
        });
    });

    describe("checkEmail", () => {
        test("good email", async () => {
            expect(checkEmail("joegaucho@ucsb.edu")).toBe(true);
        });

        test("bad emails", async () => {
            expect(checkEmail("joegaucho@umail.ucsb.edu")).toBe(false);
        });
    });
});

