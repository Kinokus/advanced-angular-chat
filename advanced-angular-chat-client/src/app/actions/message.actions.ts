export class SendMessage {
  static readonly type = '[CurrentMessage] Send';
  constructor() {
  }
}

export class SetText {
  static readonly type = '[CurrentMessage] Set Text';
  constructor(public text: string) {
  }
}

export class SetRecipientId {
  static readonly type = '[CurrentMessage] Set Recipient Id';
  constructor(public recipientId: number) {
  }
}

export class SetSenderId {
  static readonly type = '[CurrentMessage] Set Sender Id';
  constructor(public senderId: number) {
  }
}
