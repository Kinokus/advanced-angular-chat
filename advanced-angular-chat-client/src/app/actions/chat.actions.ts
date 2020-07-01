import Message from "../../../../advanced-angular-chat-server/src/entities/Message";

export class GetLatestMessages {
  static readonly type = '[Chat] Get Latest Messages';
  constructor(public count: number) {
  }
}

export class EmitToSocket {
  static readonly type = '[Chat] Emit To Socket';
  constructor() {
  }
}

export class ReceiveFromSocket {
  static readonly type = '[Chat] Receive From Socket';
  constructor() {
  }
}

