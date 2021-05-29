import { checkZoomRoomLink } from "main/utils/OfficeHourFormHelpers"; 

describe("Office Hours form helpers test", () => {
    
    describe("checkZoomRoomLink", () => {
        test("good zoom room link", () => {
            expect(checkZoomRoomLink("https://ucsb.zoom.us")).toBe(true);
            expect(checkZoomRoomLink("https://ucsb.zoom.usXXXXXXXXXXXXXXX")).toBe(true);
            expect(checkZoomRoomLink("https://ucsb.zoom.us/j/8922003499")).toBe(true);
            expect(checkZoomRoomLink("https://ucsb.zoom.us/123456789/abcdefghijklmnopqrstuvwxyz")).toBe(true);
            expect(checkZoomRoomLink("")).toBe(true);
        });

        test("bad zoom room link", () => {
            expect(checkZoomRoomLink("ucsb.zoom.us")).toBe(false);
            expect(checkZoomRoomLink("https.ucsb.zoom.usXXXXXXXXXXXXXXX")).toBe(false);
            expect(checkZoomRoomLink("https:/ucsb.zoom.us/j/8922003499")).toBe(false);
            expect(checkZoomRoomLink("https//ucsb.zoom.us/12345678")).toBe(false);
        });
    }); 

     
})