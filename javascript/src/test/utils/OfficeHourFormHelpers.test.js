import { checkTime, checkZoomRoomLink, checkFilled } from "main/utils/OfficeHourFormHelpers"; 

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

    describe("checkZoomRoomLink", () => {
        test("good zoom room link", () => {
            expect(checkZoomRoomLink("https://ucsb.zoom.us")).toBe(true);
            expect(checkZoomRoomLink("https://ucsb.zoom.usXXXXXXXXXXXXXXX")).toBe(true);
            expect(checkZoomRoomLink("https://ucsb.zoom.us/j/8922003499")).toBe(true);
            expect(checkZoomRoomLink("https://ucsb.zoom.us/123456789/abcdefghijklmnopqrstuvwxyz")).toBe(true);
        });

        test("bad zoom room link", () => {
            expect(checkZoomRoomLink("ucsb.zoom.us")).toBe(false);
            expect(checkZoomRoomLink("https.ucsb.zoom.usXXXXXXXXXXXXXXX")).toBe(false);
            expect(checkZoomRoomLink("https:/ucsb.zoom.us/j/8922003499")).toBe(false);
            expect(checkZoomRoomLink("https//ucsb.zoom.us/12345678")).toBe(false);
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
})