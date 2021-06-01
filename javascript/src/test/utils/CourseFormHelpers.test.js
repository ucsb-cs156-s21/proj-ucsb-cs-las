import { checkEmail } from "main/utils/CourseFormHelpers";

describe("course form helpers test", () => {

    describe("checkEmail", () => {
        test("good email", async () => {
            expect(checkEmail("joegaucho@ucsb.edu")).toBe(true);
        });

        test("bad emails", async () => {
            expect(checkEmail("joegaucho@umail.ucsb.edu")).toBe(false);
        });
    });
});

