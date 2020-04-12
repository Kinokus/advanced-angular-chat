import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {UserCreate, UserLogin} from '../actions/logged-user.actions';
import User from "../../../../advanced-angular-chat-server/src/entities/User";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Select(state => state.loggedUser.name) loggedUserName$: BehaviorSubject<string>;

  constructor(private store: Store) {
  }


  // todo validators

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.email]),
    password: new FormControl(null, [Validators.minLength(4)]),
    name: new FormControl(null),
    id: new FormControl(null)
  });
  isNewUser = false;


  ngOnInit(): void {


    // this.store.dispatch(
    //   new UpdateFormDirty({
    //     dirty: false,
    //     path: 'loggedUser.loginUserForm'
    //   })
    // );

  }

  onSubmit() {
    if (!this.isNewUser) {
      this.store.dispatch(new UserLogin());
    } else {
      this.loginForm.get('id').setValue(new Date().getTime());
      const user: User = new User(this.loginForm.value);
      this.store.dispatch(new UserCreate(user));
    }

  }
}
