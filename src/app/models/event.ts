export class Event implements IEvent {
    duration: string = '00:00:00';
    id: string = "currentEvent";
    startDate: Date = null;
    endDate: Date = null;
    tags: string[] = [];

    static createFromBackend(e: any): Event {  
        if (!e) {   return new Event();    }      
        const event = new Event();
        event.id = e.id;
        event.startDate = e.startDate ? e.startDate.toDate() : null;
        event.endDate = e.endDate ? e.endDate.toDate() : null;
        event.tags = e.tags ? e.tags : [];
        event.duration = event.getTime();
        return event;
    }

    public addTag(tag: string) {
        this.tags.push(tag);
    }

    public removeTag(at: number) {
        if (at >= 0 && this.tags.length > at) {
           this.tags.splice(at, 1);
        }
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

    getDate() {
        const date = this.startDate ? this.startDate : new Date();
        return date.toLocaleString();
    }

    getTime(): string {
        if (this.startDate === null) {  return '00:00:00'; }
        const eDate = Math.round((this.endDate !== null ? this.endDate : new Date()).getTime() / 1000);
        const sTime = Math.round(this.startDate.getTime() / 1000);        
        const seconds = eDate - sTime;
        return new Date(seconds * 1000).toISOString().substr(11, 8);
    }
}

export interface IEvent {
    id: string;
    startDate: Date;
    endDate: Date;
    tags: string[];
    duration: string;
}