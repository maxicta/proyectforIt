import { Email } from "../value-objects/Email";
import { Address } from "../value-objects/Address";

export class User {
    private constructor(
        public readonly name: string,
        public readonly email: Email,
        public readonly phone: string,
        public readonly addresses: Address[]
    ) {}

    static create(
        name: string,
        email: Email,
        phone: string,
        addresses: Address[]
    ): User {
        const cleanName = name.trim();
        const cleanPhone = phone.trim();

        this.validateName(cleanName);
        this.validatePhone(cleanPhone);

        return new User(cleanName, email, cleanPhone, addresses);
    }
    private static validateName(name: string): void {
        if (!name) {
            throw new Error("name empty");
        }
        if (name.length < 3) {
            throw new Error("name short");
        }
        if (name.length > 50) {
            throw new Error("name long");
        }
        const nameRegex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/;
        if (!nameRegex.test(name)) {
            throw new Error("name invalid caracter");
        }
    }
    private static validatePhone(phone: string): void {
        if (!phone) {
            throw new Error("phone empty");
        }
        const phoneRegex = /^\+\d{8,15}$/;
        if (!phoneRegex.test(phone)) {
            throw new Error("phone invalid format");
        }
    }
    private static validateLengt(data: string): void {}
}
