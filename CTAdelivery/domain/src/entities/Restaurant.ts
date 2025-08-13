import { Address } from "../value-objects/Address"
import { MenuItem } from "./MenuItem"
import { TimeRange } from "../value-objects/TimeRange"

export class Restaurant {
    private constructor(
        public readonly name: string,
        public readonly address: Address,
        public readonly phone:string,
        private _isOpen: boolean,
        public readonly openingHours: TimeRange,
        public readonly deliveryRadius: number,
        public readonly menu: MenuItem[]
    ){}
    
    static create(
    name: string,
    address: Address,
    phone: string,
    isOpen: boolean,
    openingHours: TimeRange,
    deliveryRadius: number,
    menu: MenuItem[],
    ):Restaurant {
        const cleanName = name.trim()
        const cleanPhone = phone.trim()
        this.validateName(cleanName);
        this.validatePhone(cleanPhone);
        this.validateRadius(deliveryRadius)

        return new Restaurant(cleanName,address,phone,isOpen,openingHours,deliveryRadius,menu)

    }
    private static validateName(name:string):void{
        if(!name){
            throw new Error('name empty')
        }
        if(name.length < 3){
            throw new Error('name short')
        }
        if(name.length > 50){
            throw new Error('name long')
        }
    }
    private static validatePhone(phone:string):void{
        if(!phone){
            throw new Error('phone empty')
        }
        const phoneRegex = /^\+\d{8,15}$/;
        if (!phoneRegex.test(phone)) {
            throw new Error("phone invalid format");
        }
    }
    private static validateRadius(radius:number):void{
        if(radius < 0){
            throw new Error('radius negative')
        }
        if(radius === 0){
            throw new Error('radius zero')
        }
        if(radius > 100){
            throw new Error('radius too long')
        }
    }

    get isOpen(): boolean {
        return this._isOpen;
    }

    close():void{
        this._isOpen = false;
    }

    open():void{
        this._isOpen = true
    }

    toggleOpen():void{
        this._isOpen = !this._isOpen;
    }

    getInfo(): {
        name: string;
        phone: string;
        isOpen: boolean;
        deliveryRadius: number;
        address: Address;
    } {
        return {
            name: this.name,
            phone: this.phone,
            isOpen: this.isOpen,
            deliveryRadius: this.deliveryRadius,
            address: this.address
        };
    }

    deliversTo(distance:number):boolean{
        return distance <= this.deliveryRadius

    }
}