import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import User from '../../../advanced-angular-chat-server/src/entities/User';
import Message from '../../../advanced-angular-chat-server/src/entities/Message';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  getMessagesUrl = 'api/messages/all';
  getUsersUrl = 'api/users/all';

  constructor(private http: HttpClient) {
  }

  async getMessages() {
    return this.http.get<Message[]>(this.getMessagesUrl);
  }

  async getUsers(): Promise<User[]> {
    return this.http.get<User[]>(this.getUsersUrl).toPromise();
  }

}
