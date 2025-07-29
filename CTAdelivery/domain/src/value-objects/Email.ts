export class Email {
    private constructor(private readonly _value: string) {}

    static create(email: string): Email {
        const emailTrim = email.trim()
        const normalizeToLoercase = emailTrim.toLowerCase()
        if(this.isEmpty(email)){
            throw new Error('email empty')
        }

        if(email === "null" ){
            throw new Error('email null ')
        }
        if(!this.isValidFormat(normalizeToLoercase)){
            throw new Error('invalid email format')
        }



        return new Email(normalizeToLoercase)

    }
    private static isEmpty(email:string): boolean {
        if(email.length === 0){
            return true
            
        }
        return false
    }

    private static isValidFormat(email:string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }


    get value(): string {
        return this._value
    }

}