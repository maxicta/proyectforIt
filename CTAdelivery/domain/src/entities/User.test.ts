import { User } from "./User";
import { Address } from "../value-objects/Address";
import { describe, test, expect } from "vitest";
import { Email } from "../value-objects/Email";

describe("User", () => {
    describe("create", () => {
        test("should create user whit valid data", () => {
            const email = Email.create("test@email.com");
            const user = User.create("juan perez", email, "+542320123456", []);
            expect(user.name).toBe("juan perez");
            expect(user.email).toBe(email);
            expect(user.phone).toBe("+542320123456");
            expect(user.addresses).toEqual([]);
        });

        test("should create user with addresses", () => {
            const address1 = Address.create(
                "siempre viva",
                "1234",
                "sprinfield",
                "123",
                "argentina"
            );
            const address2 = Address.create(
                "uspallata",
                "1234",
                "grand b",
                "1615",
                "argentina"
            );
            const email = Email.create("test@email.com");
            const user = User.create("juan perez", email, "+542320123456", [
                address1,
                address2,
            ]);
            expect(user.addresses).toHaveLength(2);
            expect(user.addresses[0]).toBe(address1);
            expect(user.addresses[1]).toBe(address2);
        });

        test("should create user with space", () => {
            const email = Email.create("   test@email.com  ");
            const user = User.create("  juan perez  ", email, "  +542320123456  ", []);

            expect(user.name).toBe("juan perez");
            expect(user.email.value).toBe("test@email.com");
            expect(user.phone).toBe("+542320123456");
        });

        test("should name cannot", () => {
            const email = Email.create("test@email.com");
            expect(() => User.create("", email, "+542320123456", [])).toThrow(
                "name empty"
            );
        });

        test("should name short", () => {
            const email = Email.create("test@email.com");
            expect(() => User.create("ju", email, "+542320123456", [])).toThrow(
                "name short"
            );
            expect(() =>
                User.create("ju".repeat(50), email, "+542320123456", [])
            ).toThrow("name long");
        });

        test("should name invalid caracter", () => {
            expect(() =>
                User.create(
                    "juan123",
                    Email.create("test@email.com"),
                    "+542320123456",
                    []
                )
            ).toThrow("name invalid caracter");
        });
    });
    describe("phone validation", () => {
        test("should phone empty", () => {
            expect(() =>
                User.create(
                    "juan peres",
                    Email.create("test@email.com"),
                    "",
                    []
                )
            ).toThrow("phone empty");
        });

        test("should phone invalid format", () => {
            const invalidPhone = [
                "123",
                "abc123",
                "123abc456",
                "+54",
                "+54-11-1234",
                "(11) 1234-5678",
                "phone123",
            ];
            invalidPhone.forEach((phone) => {
                expect(() =>
                    User.create(
                        "juan peres",
                        Email.create("test@Email.com"),
                        phone,
                        []
                    )
                ).toThrow('phone invalid format');
            });
        });
    });
});
