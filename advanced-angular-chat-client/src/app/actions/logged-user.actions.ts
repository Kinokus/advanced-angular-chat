import User from '../../../../advanced-angular-chat-server/src/entities/User';

export class UserLogin {
  static readonly type = '[LoggedUser] Login';

  constructor() {
  }


}

export class UserCreate {
  static readonly type = '[LoggedUser] Create';

  constructor(public user: User) {
  }


}
