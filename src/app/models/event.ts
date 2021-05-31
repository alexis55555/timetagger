export class Event {
    startDate: Date = new Date();
    endDate?: Date;
    tags: string[] = [];

    public addTag(tag: string) {
        this.tags.push(tag);
    }
}