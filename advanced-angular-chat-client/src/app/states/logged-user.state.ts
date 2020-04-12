import {Action, State, StateContext, Store} from '@ngxs/store';
import {ApiService} from '../api.service';
import {LoggedUser} from '../models/logged.user';
import {UserCreate, UserLogin} from '../actions/logged-user.actions';
import {LoginStatus} from '../models/login-status';
import {UpdateFormValue} from '@ngxs/form-plugin';
import {Injectable} from '@angular/core';
import {SendMessage, SetSenderId, SetText} from '../actions/message.actions';
import {CreateUserStatus} from '../models/createUserStatus';


@State<LoggedUser>({
  name: 'loggedUser',
  defaults: {
    loginUserForm: {
      model: undefined,
      dirty: false,
      status: '',
      errors: {}
    },
    email: '',
    id: -2,
    name: '%username%',
    logged: false,
    password: ''
  }
})
@Injectable()
export class LoggedUserState {
  @Action(UserLogin)
  userLogin(context: StateContext<LoggedUser>, action: UserLogin) {
    const currentState = context.getState();
    this.apiService.loginUser(currentState.loginUserForm.model)
      .then(async (loginStatus: LoginStatus) => {
        if (loginStatus.status) {
          context.patchState({logged: loginStatus.status});
          context.patchState(loginStatus.user);

          await this.store.dispatch(new SetSenderId(loginStatus.user.id));
          await this.store.dispatch(new SetText(`User ${loginStatus.user.name} logged in`));
          await this.store.dispatch(new SendMessage());


        }
      })
      .catch(({error}) => {
        context.patchState({logged: error.status});
        console.log(error.reason);
      });
  }

  @Action(UpdateFormValue)
  updateFormValue(context, {payload}) {
    if (payload.path.includes('loggedUser')) {
      context.patchState(payload.value);
    }
  }

  @Action(UserCreate)
  userCreate(context: StateContext<LoggedUser>, action: UserCreate) {
    this.apiService.createUser(action.user).then((createUserStatus: CreateUserStatus) => {
      if (createUserStatus.status) {
        this.store.dispatch(new UserLogin());
      }
    });
  }


  constructor(private apiService: ApiService, private  store: Store) {
  }
}
