import { compareValues } from "main/utils/sortHelper"

describe("sortHelper tests", () => {


    describe("compareValues test with key", () => {

        var singers = [];

        const tyler = { name: 'Steven Tyler', band: 'Aerosmith', born: 1948 };
        const carpenter = { name: 'Karen Carpenter', band: 'The Carpenters', born: 1950 };
        const cobain = { name: 'Kurt Cobain', band: 'Nirvana', born: 1967 };
        const nicks = { name: 'Stevie Nicks', band: 'Fleetwood Mac', born: 1948 };
    
        beforeEach(() => {
            singers = [tyler, carpenter, cobain, nicks]
        });

        test("should sort by name", async () => {
            singers.sort(compareValues('name'));
            expect(singers).toEqual([carpenter, cobain, tyler, nicks])
        });

        test("should sort by band, descending", async () => {
            singers.sort(compareValues('band', 'desc'));
            expect(singers).toEqual([carpenter, cobain, nicks, tyler])
        });

        test("should sort by year born", async () => {
            singers.sort(compareValues('born'));
            expect(singers).toEqual([tyler, nicks, carpenter, cobain])
        });

        test("should not sort at all", async () => {
            singers.sort(compareValues('potato'));
            expect(singers).toEqual(singers)
        });

    });

    describe("compareValues tests without key", () => {

        const quarters = ['20201', '20211', '20204', '20202'];
        var qtrs = null;

        beforeEach(() => {
            qtrs = [...quarters] // deep copy
        });

        test("should sort ascending", async () => {
            qtrs.sort(compareValues(null));
            expect(qtrs).toEqual(['20201', '20202', '20204', '20211'])
        });

        test("should sort descending", async () => {
            qtrs.sort(compareValues(null,'desc'));
            expect(qtrs).toEqual(['20211', '20204', '20202', '20201'])
        });
    });
});