import {Component, OnInit} from '@angular/core';
import Message from '../../../../advanced-angular-chat-server/src/entities/Message';
import {ApiService} from '../api.service';
import {Select, Store} from '@ngxs/store';
import {BehaviorSubject} from 'rxjs';
import {GetLatestMessages} from '../actions/chat.actions';
import User from "../../../../advanced-angular-chat-server/src/entities/User";

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss']
})
export class MessagesListComponent implements OnInit {
  @Select(state => state.chat.messages) messages$: BehaviorSubject<Message[]>;
  @Select(state => state.chatUsers.usersHelperById) users$: BehaviorSubject<object>;

  // public messages: Message[];

  constructor(private apiService: ApiService, private store: Store) {
  }

  async ngOnInit(): Promise<void> {



    // console.log(this.messages$.value);
    // this.messages = await this.apiService.getMessages();
    // this.messages = await this.apiService.getLatestMessages(10);


    // this.store.dispatch(new GetLatestMessages(50));
  }

}
