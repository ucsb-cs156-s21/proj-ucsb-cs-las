import { toAMPMFormat } from "main/utils/RoomSlotTableHelpers";

describe("room slot table helpers test", () => {
    describe("toAMPMFormat", () => {
        test("malformatted times", () => {
            expect(toAMPMFormat("111:35")).toBe("111:35");
            expect(toAMPMFormat("asdfghjkl")).toBe("asdfghjkl");
        })

        test("AM times", () => {
            expect(toAMPMFormat("00:30")).toBe("12:30AM");
            expect(toAMPMFormat("08:30")).toBe("8:30AM");
            expect(toAMPMFormat("10:05")).toBe("10:05AM");
            expect(toAMPMFormat("11:29")).toBe("11:29AM");
        });

        test("PM times", () => {
            expect(toAMPMFormat("12:30")).toBe("12:30PM");
            expect(toAMPMFormat("17:30")).toBe("5:30PM");
            expect(toAMPMFormat("19:05")).toBe("7:05PM");
            expect(toAMPMFormat("22:29")).toBe("10:29PM");
        });
    });
});