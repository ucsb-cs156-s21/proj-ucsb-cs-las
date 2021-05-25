import { checkCourseQuarter, checkTime, checkFilled } from "main/utils/FormHelpers";

describe("form helpers test", () => {
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


    describe("checkTime", () => {
        test("good time", () => {
            expect(checkTime("1:00PM")).toBe(true);
            expect(checkTime("12:00PM")).toBe(true);
            expect(checkTime("9:30AM")).toBe(true);
            expect(checkTime("11:35AM")).toBe(true);
        });

        test("bad time", () => {
            expect(checkTime("01:00PM")).toBe(false);
            expect(checkTime("1:75PM")).toBe(false);
            expect(checkTime("S2020")).toBe(false);
            expect(checkTime("19PM")).toBe(false);
        });
    });


    describe("checkFilled", () => {
        test("filled", () => {
            expect(checkFilled("https://ucsb.zoom.us")).toBe(true);
            expect(checkFilled("W")).toBe(true);
            expect(checkFilled("10:30AM")).toBe(true);
        });

        test("not filled", () => {
            expect(checkFilled()).toBe(false);
        });
    });

});