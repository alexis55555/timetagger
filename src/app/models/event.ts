export class Event implements IEvent {
    startDate: Date = null;
    endDate: Date = null;
    tags: string[] = [];

    static createFromBackend(e: IEvent): Event {
        const event = new Event();
        event.startDate = e.startDate;
        event.endDate = e.endDate;        
        event.tags = e.tags;
        console.log(event)
        return event;
    }

    public addTag(tag: string) {
        this.tags.push(tag);
    }

    public removeTag(at: number) {
        if (at >= 0 && this.tags.length > at) {
            this.tags = this.tags.splice(at, 1);
        }
    }

    json() {
        return {startDate: this.startDate,
                endDate: this.endDate,
                tags: this.tags}
    }

    start() {
        this.endDate = null;
        this.startDate = new Date();        
    }

    isRunning(): boolean {
        return this.startDate && this.endDate === null;
    }

    stop() {
        this.endDate = new Date();
    }

    getTime() {
        if (this.startDate === null) {  return 0; }
        const eDate = Math.round((this.endDate !== null ? this.endDate : new Date()).getTime() / 1000);
        const sTime = Math.round(this.startDate.getTime() / 1000);        
        return eDate - sTime;
    }
}

export interface IEvent {
    startDate: Date;
    endDate: Date;
    tags: string[];
}