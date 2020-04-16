import {Action, State, Store} from '@ngxs/store';
import Message from '../../../../advanced-angular-chat-server/src/entities/Message';
import {Injectable} from '@angular/core';
import {ApiService} from '../api.service';
import {SendMessage, SetRecipientId, SetSenderId, SetText} from '../actions/message.actions';
import {UpdateFormValue} from '@ngxs/form-plugin';
import {GetLatestMessages} from "../actions/chat.actions";

@State<Message>({
  name: 'currentMessage',
  defaults: {
    fromUserId: -1,
    id: -1,
    text: '',
    toUserId: -1,
    currentMessageForm: {
      model: undefined,
      dirty: false,
      status: '',
      errors: {}
    }
  }
})
@Injectable()
export class MessageState {
  constructor(private apiService: ApiService, private store: Store) {
  }

  @Action(SendMessage)
  async sendMessage(context) {
    context.patchState({id: new Date().getTime()});
    const currentState: Message = context.getState();
    currentState.currentMessageForm = undefined;
    await this.apiService.sendMessage(currentState);

    // todo move getlastest to webSocket ???
    // await this.store.dispatch(new GetLatestMessages(50));
  }

  @Action(SetText)
  setText(context, payload: SetText) {
    context.patchState({text: payload.text});
  }

  @Action(SetRecipientId)
  setRecipientId(context, payload: SetRecipientId) {
    context.patchState({toUserId: payload.recipientId});
  }

  @Action(SetSenderId)
  setSenderId(context, payload: SetSenderId) {
    context.patchState({fromUserId: payload.senderId});
  }

  @Action(UpdateFormValue)
  updateFormValue(context, {payload}) {
    if (payload.path.includes('currentMessage')) {
      context.patchState(payload.value);
    }

  }


}

