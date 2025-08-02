import { count } from "console";
import { Location } from "./Location";

export class Address {
    private constructor(
        private readonly _street: string,
        private readonly _number: string,
        private readonly _city: string,
        private readonly _zipCode: string,
        private readonly _country: string
    ) {}

    static create(
        street: string,
        number: string,
        city: string,
        zipCode: string,
        country: string
    ) {
        if(this.isStreetEmpty(street)){
            throw new Error('street empty')
        }
        if(street.length < 3){
            throw new Error('street short')
        }
        if(this.isNumberEmpty(number)){
            throw new Error('number empty')
        }
        if(this.isCityEmpty(city)){
            throw new Error('city empty')
        }
        if(this.isZipCodeEmpty(zipCode)){
            throw new Error('zipCode empty')
        }
        if(this.isCountryEmpty(country)){
            throw new Error('country empty')
        }
        if(this.isCityShort(city)){
            throw new Error('city short')
        }
        if(!this.isNumber(number)){
            throw new Error('number invalid format')
        }
        if(!this.isZipcode(zipCode)){
            throw new Error('zipCode invalid format')
        }
        return new Address(street, number, city, zipCode, country);
    }

    private static isStreetEmpty(street: string): boolean {
        if (street.length === 0) {
            return true;
        }
        return false;
    }

    private static isNumberEmpty(number:string): boolean {
        if(number.length === 0) {
            return true
        }
        return false
    }

    private static isNumber(number:string): boolean {
        if(Number(number)){
            return true
        }
        return false
    }

    private static isZipcode(zipCode:string): boolean {
        if(Number(zipCode)){
            return true
        }
        return false
    }

    

    private static isCityEmpty(city:string): boolean {
        if(city.length === 0){
            return true
        }
        return false
    }

    private static isCityShort(city:string): boolean {
        if(city.length < 3){
            return true
        }
        return false
    }

    private static isZipCodeEmpty(zipCode:string): boolean {
        if(zipCode.length === 0){
            return true
        }
        return false
    }

    private static isCountryEmpty(country:string): boolean {
        if(country.length === 0){
            return true
        }
        return false
    }

    get street(): string {
        return this._street;
    }
    get number(): string {
        return this._number;
    }
    get city(): string {
        return this._city;
    }
    get zipCode(): string {
        return this._zipCode;
    }
    get country(): string {
        return this._country;
    }
}
