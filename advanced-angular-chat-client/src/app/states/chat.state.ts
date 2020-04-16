import Message from '../../../../advanced-angular-chat-server/src/entities/Message';
import {Action, State} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {ApiService} from '../api.service';
import {GetLatestMessages} from '../actions/chat.actions';

class Chat {
  messages: Message[];
}

@State<Chat>({
  name: 'chat',
  defaults: {
    messages: []
  }
})
@Injectable()
export class ChatState {
  constructor(private apiService: ApiService) {
  }

  @Action(GetLatestMessages)
  async getLatestMessages(context, action: GetLatestMessages) {
    const messages = await this.apiService.getLatestMessages(action.count);
    context.patchState({messages});
  }
}
