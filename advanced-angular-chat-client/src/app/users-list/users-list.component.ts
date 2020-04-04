import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import User from '../../../../advanced-angular-chat-server/src/entities/User';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  public users: User[];

  constructor(private apiService: ApiService) { }

  async ngOnInit(): Promise<void> {
    this.users = await this.apiService.getUsers();
    debugger
  }

}
