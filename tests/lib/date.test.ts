import {describe, expect, test} from "vitest";
import {calendarList, isLeapYear, nextMonth, prevMonth} from "../../src/lib/date";

describe("lib date", () => {

    test("classifies year correctly", () => {
        expect(isLeapYear(2020)).toBe(true);
        expect(isLeapYear(2024)).toBe(true);
        expect(isLeapYear(2100)).toBe(false);
        expect(isLeapYear(2018)).toBe(false);
    });

    test("previous month", () => {
        // GIVEN
        for (let i = 1; i < 12; i++) {
            const date = new Date(2021, i, 5);
            const expected = new Date(2021, i - 1, 5);

            // WHEN
            const result = prevMonth(date);

            // THEN
            expect(result.getTime()).toBe(expected.getTime());
        }
    })

    test("previous month january", () => {
        // GIVEN
        const date = new Date(2021, 0, 1);
        const expected = new Date(2020, 11, 1);

        // WHEN
        const result = prevMonth(date);

        // THEN
        expect(result.getTime()).toBe(expected.getTime());
    })

    test("previous month 31st", () => {
        // GIVEN
        const date = new Date(2021, 2, 31);
        const expected = new Date(2021, 1, 28);

        // WHEN
        const result = prevMonth(date);

        // THEN
        expect(result.getTime()).toBe(expected.getTime());
    })

    test("next month", () => {
        for (let i = 0; i < 11; i++) {
            const date = new Date(2021, i, 5);
            const expected = new Date(2021, i + 1, 5);

            // WHEN
            const result = nextMonth(date);

            // THEN
            expect(result.getTime()).toBe(expected.getTime());
        }
    })

    test("next month december", () => {
        // GIVEN
        const date = new Date(2021, 11, 31);
        const expected = new Date(2022, 0, 31);

        // WHEN
        const result = nextMonth(date);

        // THEN
        expect(result.getTime()).toBe(expected.getTime());
    })

    test("next month 31st", () => {
        // GIVEN
        const date = new Date(2021, 0, 31);
        const expected = new Date(2021, 1, 28);

        // WHEN
        const result = nextMonth(date);

        // THEN
        expect(result.getTime()).toBe(expected.getTime());
    })

    test("calendar offset", () => {
        const date = new Date(2025, 10, 16);

        // WHEN
        const list = calendarList(date)

        // THEN
        expect(list).instanceof(Array);
        expect(list.length % 7).toBe(0);
        for (let i = 1; i < 30; i++) {
            expect(list.map(date => date.getTime())).toContain(new Date(2025, 10, i).getTime());
        }
    })
});