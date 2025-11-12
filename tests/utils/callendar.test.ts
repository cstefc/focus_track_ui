import {describe, expect, test} from "vitest";
import {isLeapYear} from "../../src/utils/calendar";

describe("isLeapYear()", () => {
   test("classifies year correctly", () => {
       expect(isLeapYear(2020)).toBe(true);
       expect(isLeapYear(2024)).toBe(true);
       expect(isLeapYear(2100)).toBe(false);
       expect(isLeapYear(2018)).toBe(false);
   });
});