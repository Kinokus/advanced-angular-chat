import {Action, State, StateContext} from '@ngxs/store';
import User from '../../../../advanced-angular-chat-server/src/entities/User';
import {Injectable} from '@angular/core';
import {UserLogin} from '../actions/logged-user.actions';
import {LoggedUser} from '../models/logged.user';


class ChatUsers {
  users: User[] = [];
  usersHelperById: {} = {};
}

@State<ChatUsers>({
  name: 'users',
  defaults: {
    users: [],
    usersHelperById: {}
  }
})
@Injectable()
export class UsersState {
  @Action(UserLogin)
  userLogin(context: StateContext<LoggedUser>, action: UserLogin) {
    console.log(context);
    console.log(action);
  }
}
