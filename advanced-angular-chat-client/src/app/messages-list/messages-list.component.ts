import {Component, OnInit} from '@angular/core';
import Message from '../../../../advanced-angular-chat-server/src/entities/Message';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss']
})
export class MessagesListComponent implements OnInit {

  public messages: Message[];

  constructor(private apiService: ApiService) {
  }

  async ngOnInit(): Promise<void> {
    this.messages = await this.apiService.getMessages();
  }

}
