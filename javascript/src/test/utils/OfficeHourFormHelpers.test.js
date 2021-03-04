import { checkTime } from "main/utils/OfficeHourFormHelpers"; 

describe("Office Hours form helpers test", () => {
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
})