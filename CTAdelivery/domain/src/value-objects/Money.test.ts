import { describe, test, expect } from "vitest";
import { Money } from "./Money";

describe("Money", () => {
    test("should create money whit valid amount", () => {
        const money = Money.create(100, "ARG");
        expect(money.amount).toBe(100);
        expect(money.currency).toBe("ARG");
    });
    test(" should create money whit value < 0", () => {
        expect(() => Money.create(-100, "ARG")).toThrow(
            "amount is less than zero"
        );
    });
    
});
