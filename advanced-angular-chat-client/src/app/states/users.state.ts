import {Action, State, StateContext, Store} from '@ngxs/store';
import User from '../../../../advanced-angular-chat-server/src/entities/User';
import {Injectable} from '@angular/core';
import {UserLogin} from '../actions/logged-user.actions';
import {LoggedUser} from '../models/logged.user';
import {GetAllUsers} from "../actions/users.actions";
import {ApiService} from "../api.service";


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
  userLogin(context: StateContext<ChatUsers>, action: UserLogin) {
    console.log(context);
    console.log(action);
  }

  @Action(GetAllUsers)
  getAllUsers(context: StateContext<ChatUsers>) {
    this.apiService.getUsers().then(users => {
      context.patchState({users});
      const usersHelperById = {};
      users.forEach(user => {
        usersHelperById[user.id] = user.name;
      });
      context.patchState({usersHelperById});
    });
  }


  constructor(private apiService: ApiService, private  store: Store) {
  }


}
