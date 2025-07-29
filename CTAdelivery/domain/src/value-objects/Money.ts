export class Money {
    private constructor(
        private readonly _amount: number,
        private readonly _currency: string
    ) {}

    static create(amount: number, currency: string): Money {
        if (this.isAmountNegative(amount)) {
            throw new Error("amount is less than zero");
        }
        return new Money(amount, currency);
    }

    private static isAmountNegative(amount: number): boolean {
        if (amount < 0) {
            return true;
        }
        return false;
    }

    get amount(): number {
        return this._amount;
    }

    get currency(): string {
        return this._currency;
    }
}
