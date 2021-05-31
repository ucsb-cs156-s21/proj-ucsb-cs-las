import { formatTimeToLocalTime } from "main/utils/RoomSlotFormHelpers";

describe("room slot form helpers test", () => {
    describe("formatTimeToLocalTime", () => {
        test("AM times", () => {
            expect(formatTimeToLocalTime("12:15AM")).toBe("00:15:00");
            expect(formatTimeToLocalTime("2:30AM")).toBe("02:30:00");
            expect(formatTimeToLocalTime("10:00AM")).toBe("10:00:00");
            expect(formatTimeToLocalTime("11:05AM")).toBe("11:05:00");
        });

        test("PM times", () => {
            expect(formatTimeToLocalTime("12:15PM")).toBe("12:15:00");
            expect(formatTimeToLocalTime("3:24PM")).toBe("15:24:00");
            expect(formatTimeToLocalTime("5:30PM")).toBe("17:30:00");
            expect(formatTimeToLocalTime("10:30PM")).toBe("22:30:00");
        });
    });
});