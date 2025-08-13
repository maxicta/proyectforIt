import { describe, test, expect } from 'vitest';
import { TimeRange } from './TimeRange';

describe('TimeRange', ()=>{
    test('should create valid range', ()=>{
        const range = TimeRange.create('09:00','22:00');
        expect(range.startTime).toBe('09:00');
        expect(range.endTime).toBe('22:00');
    });

    test('should invalid format', () => {
        expect(()=>TimeRange.create('9:00','22:00')).toThrow('invalid format startTime')
        expect(()=>TimeRange.create('09:00','22:60')).toThrow('invalid format endTime')
    });

    test('should startTime >= endTime',()=>{
        expect(()=>TimeRange.create('22:00','09:00')).toThrow('startTime must endTime');
    })
})