export class IMessage {
    constructor(id: number, text: string) {
        this.id = id;
        this.text = text;
    }

    public id: number;
    public text: string;
}