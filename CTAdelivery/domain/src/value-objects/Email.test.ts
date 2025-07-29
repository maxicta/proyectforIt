import { describe, test, expect } from 'vitest';
import {Email} from './Email'

describe("Email", ()=>{
    test("should create a valid email", ()=>{
        const validEmail = 'user@example.com'
        const email = Email.create(validEmail)
        expect(email.value).toBe(validEmail)
    })
    test("should normalize a mail tolowercase", ()=>{
        const inputEmail = 'USER@EXAMPLE.COM'
        const email = Email.create(inputEmail)
        expect(email.value).toBe('user@example.com')
    })
    test("should trim whitespace from email", ()=>{
        const spaceEmail = '  user@example.com  '
        const email = Email.create(spaceEmail)
        expect(email.value).toBe('user@example.com')
    })
    test("should throw error for empty email", ()=>{
        expect(() => Email.create('')).toThrow('email empty')
    })
    test("should throw error for invalid email format", ()=>{
        const invalidEmail = 'user--example'
        expect(()=> Email.create(invalidEmail)).toThrow('invalid email format')
    })
    test("should throw error for null/undefined email", ()=>{
        const noNullEmail = "null"
        expect(()=> Email.create(noNullEmail)).toThrow('email null')

    })

})