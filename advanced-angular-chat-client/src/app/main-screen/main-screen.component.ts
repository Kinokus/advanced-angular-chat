import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Select, Store} from '@ngxs/store';
import {BehaviorSubject} from 'rxjs';
import Message from '../../../../advanced-angular-chat-server/src/entities/Message';
import {SendMessage, SetText} from '../actions/message.actions';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent implements OnInit {

  @Select(state => state.loggedUser.logged) loggedUserLogged$: BehaviorSubject<boolean>;

  constructor(private apiService: ApiService, private store: Store) {
  }


  async ngOnInit(): Promise<void> {
    // console.log(await this.apiService.login());
    // const tempMessage: Message = new Message({
    //   toUserId: -1,
    //   fromUserId: -1,
    //   id: new Date().getTime(),
    //   text: `app started #${new Date().getTime()}`
    // });
    // await this.apiService.sendMessage(tempMessage);

    await this.store.dispatch(new SetText(`app started #${new Date().getTime()}`));
    await this.store.dispatch(new SendMessage());

  }

}
