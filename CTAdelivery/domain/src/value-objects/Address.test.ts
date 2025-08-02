import { describe, test, expect } from "vitest";
import { Address } from "./Address";

describe("Address", () => {
    test("should street empty", () => {
        expect(() =>
            Address.create("", "123", "springfield", "1234", "argentina")
        ).toThrow("street empty");
    });
    test("should street min 3 chart", () => {
        expect(() =>
            Address.create("st", "23", "springfield", "1234", "argentina")
        ).toThrow("street short");
    });
    test("should number empty", () => {
        expect(() =>
            Address.create(
                "siempreviva",
                "",
                "springfield",
                "1234",
                "argentina"
            )
        ).toThrow("number empty");
    });
    test("should number invalid format", () => {
        expect(() =>
            Address.create(
                "siempreviva",
                "abc",
                "springfield",
                "1234",
                "argentina"
            )
        ).toThrow("number invalid format");
    });

    test("should city empty", () => {
        expect(() =>
            Address.create("siempreviva", "abc", "", "1234", "argentina")
        ).toThrow("city empty");
    });
    test("should city min 3 and 15 chart", () => {
        expect(() =>
            Address.create(
                "siempreviva",
                "1234",
                "sp",
                "1234",
                "argentina"
            )
        ).toThrow('city short');
    });

    test("should zipCode empty", ()=>{
        expect(()=>
        Address.create(
            "siempreviva",
                "1234",
                "springfield",
                "",
                "argentina"
        )).toThrow('zipCode empty')
    });
    test("should zipcode invalid format", ()=>{
        expect(()=>
        Address.create(
            "siempreviva",
                "1234",
                "springfield",
                "ab",
                "argentina"
        )).toThrow('zipCode invalid format')
    });

    test("should country empty",()=>{
        expect(()=>
        Address.create(
            "siempreviva",
                "1234",
                "springfield",
                "1234",
                ""
        )).toThrow('country empty')
    });
});
