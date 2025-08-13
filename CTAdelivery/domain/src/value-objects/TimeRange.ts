export class TimeRange {
    constructor(
        public readonly startTime: string, // "09:00"
        public readonly endTime: string // "22:00"
    ) {}

    static create(startTime: string, endTime: string): TimeRange {
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if(!timeRegex.test(startTime)){
            throw new Error('invalid format startTime')
        };
        if(!timeRegex.test(endTime)){
            throw new Error('invalid format endTime')
        };

        if(startTime >= endTime){
            throw new Error('startTime must endTime')
        }
        
        return new TimeRange(startTime, endTime);
    }

    contains(time: string): boolean {

        return  time >= this.startTime && time <= this.endTime;
    }
}