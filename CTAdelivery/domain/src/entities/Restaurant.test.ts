import { beforeEach, describe, test, expect } from "vitest";
import { Restaurant } from "../entities/Restaurant";
import { Address } from "../value-objects/Address";

import { TimeRange } from "../value-objects/TimeRange";

describe("Restaurant", () => {
    const address = Address.create(
        "calle falsa",
        "1234",
        "caba",
        "1000",
        "Argentina"
    );

    const timeRange = TimeRange.create("09:00", "22:00");

    describe("create", () => {
        test("should create restaurant", () => {
            const restaurant = Restaurant.create(
                "Pizza express",
                address,
                "+541123456789",
                true,
                timeRange,
                0.5,
                []
            );
            expect(restaurant.name).toBe("Pizza express");
            expect(restaurant.address).toBe(address);
            expect(restaurant.phone).toBe("+541123456789");
            expect(restaurant.isOpen).toBe(true);
            expect(restaurant.openingHours).toEqual(timeRange);
            expect(restaurant.deliveryRadius).toBe(0.5);
            expect(restaurant.menu).toEqual([]);
        });

        test("should isOpen false", () => {
            const restaurant = Restaurant.create(
                "Pizza express",
                address,
                "+541123456789",
                false,
                timeRange,
                0.5,
                []
            );
            expect(restaurant.isOpen).toBe(false);
        });

        test("should trim name restaruant", () => {
            const restaurant = Restaurant.create(
                "  Pizza express  ",
                address,
                "+541123456789",
                true,
                timeRange,
                0.5,
                []
            );
            expect(restaurant.name).toBe("Pizza express");
        });
    });
    describe("validation name", () => {
        test("should name empty", () => {
            expect(() =>
                Restaurant.create(
                    "",
                    address,
                    "+541123456789",
                    true,
                    timeRange,
                    0.5,
                    []
                )
            ).toThrow("name empty");
        });
        test("should name lenght", () => {
            expect(() =>
                Restaurant.create(
                    "A",
                    address,
                    "+541123456789",
                    true,
                    timeRange,
                    0.5,
                    []
                )
            ).toThrow("name short");
            expect(() =>
                Restaurant.create(
                    "a".repeat(51),
                    address,
                    "+541123456789",
                    true,
                    timeRange,
                    0.5,
                    []
                )
            ).toThrow("name long");
        });
    });

    describe("phone validation", () => {
        const phoneInvalid = [
            "123",
            "abc123",
            "123abc456",
            "+54",
            "not-a-phone",
        ];

        test("should phone empty", () => {
            expect(() =>
                Restaurant.create(
                    "Pizza Express",
                    address,
                    "",
                    true,
                    timeRange,
                    0.5,
                    []
                )
            ).toThrow("phone empty");
        });

        test("should invalid format", () => {
            expect(() =>
                phoneInvalid.forEach((phone) =>
                    Restaurant.create(
                        "Pizza express",
                        address,
                        phone,
                        true,
                        timeRange,
                        0.5,
                        []
                    )
                )
            ).toThrow("phone invalid format");
        });
    });

    describe("validate delivery radius", () => {
        test("should delivery radius negative", () => {
            expect(() =>
                Restaurant.create(
                    "Pizza express",
                    address,
                    "+541123456789",
                    true,
                    timeRange,
                    -0.5,
                    []
                )
            ).toThrow("radius negative");
        });

        test("should delivery zero", () => {
            expect(() =>
                Restaurant.create(
                    "Pizza express",
                    address,
                    "+541123456789",
                    true,
                    timeRange,
                    0,
                    []
                )
            ).toThrow("radius zero");
        });

        test("should delivery > 100km", () => {
            expect(() =>
                Restaurant.create(
                    "Pizza express",
                    address,
                    "+541123456789",
                    true,
                    timeRange,
                    101,
                    []
                )
            ).toThrow("radius too long");
        });
    });

    describe("method bussines", () => {
        let restaurant: Restaurant;
        const timeRange = TimeRange.create("09:00", "22:00");
        beforeEach(() => {
            restaurant = Restaurant.create(
                "Pizza express",
                address,
                "+541123456789",
                true,
                timeRange,
                5,
                []
            );
        });

        test("should open restaurant", () => {
            restaurant.close();
            expect(restaurant.isOpen).toBe(false);
            restaurant.open();
            expect(restaurant.isOpen).toBe(true);
        });

        test("should close restaurant", () => {
            expect(restaurant.isOpen).toBe(true);
            restaurant.close();
            expect(restaurant.isOpen).toBe(false);
        });

        test("should toggle open status", () => {
            const initialStatus = restaurant.isOpen;
            restaurant.toggleOpen();
            expect(restaurant.isOpen).toBe(!initialStatus);

            restaurant.toggleOpen();
            expect(restaurant.isOpen).toBe(initialStatus);
        });
    });

    describe("method info", () => {
        test("shoul get info", () => {
            const restaruant = Restaurant.create(
                "Pizza Express",
                address,
                "+541123456789",
                true,
                timeRange,
                5,
                []
            );
            const info = restaruant.getInfo();
            expect(info).toEqual({
                name: "Pizza Express",
                phone: "+541123456789",
                isOpen: true,
                deliveryRadius: 5,
                address: address,
            });
        });

        test("deliver distance", () => {
            const restaruant = Restaurant.create(
                "Pizza Express",
                address,
                "+541123456789",
                true,
                timeRange,
                5,
                []
            );
            expect(restaruant.deliversTo(3)).toBe(true);
            expect(restaruant.deliversTo(6)).toBe(false);
        });
    });
});
