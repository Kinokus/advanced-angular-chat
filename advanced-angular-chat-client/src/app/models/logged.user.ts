import User from '../../../../advanced-angular-chat-server/src/entities/User';

export class LoggedUser extends User {
  logged: boolean;
  loginUserForm: any;
}
