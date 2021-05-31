export class Event {
    startDate: Date = new Date();
    endDate?: Date = null;
    tags: string[] = [];

    public addTag(tag: string) {
        this.tags.push(tag);
    }

    json() {
        return {startDate: this.startDate,
                endDate: this.endDate,
                tags: this.tags}
    }
}