export interface IMessage {
    id: number;
    text: string;
    fromUserId: number;
    toUserId?: number;
}

class Message implements IMessage {
    public toUserId?: number;
    public fromUserId: number;
    public text: string;
    public id: number;


    constructor(message: IMessage) {
        this.toUserId = message.toUserId;
        this.fromUserId = message.fromUserId;
        this.text = message.text;
        this.id = message.id;
    }
}

export default Message;