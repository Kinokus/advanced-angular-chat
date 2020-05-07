import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import User from '../../../../advanced-angular-chat-server/src/entities/User';
import {UserLogin} from '../actions/logged-user.actions';
import {SetRecipientId} from '../actions/message.actions';
import {Select, Store} from '@ngxs/store';
import {BehaviorSubject} from 'rxjs';
import Message from "../../../../advanced-angular-chat-server/src/entities/Message";
import {GetAllUsers} from "../actions/users.actions";

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
    public users: User[];

    @Select(state => state.currentMessage.toUserId) toUserId$: BehaviorSubject<number>;
    @Select(state => state.currentMessage) message$: BehaviorSubject<Message>;
    @Select(state => state.chatUsers.users) users$: BehaviorSubject<User[]>;

    constructor(private apiService: ApiService, private  store: Store) {
    }

    async ngOnInit(): Promise<void> {
        // todo move users to state
        // this.users = await this.apiService.getUsers();
        this.store.dispatch(new GetAllUsers());
    }

    public setRecipient(id: number) {
        this.store.dispatch(new SetRecipientId(id));
    }
}
