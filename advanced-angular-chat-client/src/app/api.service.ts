import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import User from '../../../advanced-angular-chat-server/src/entities/User';
import Message from '../../../advanced-angular-chat-server/src/entities/Message';
import {LoginStatus} from './loginStatus';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  getMessagesUrl = 'api/messages/all';
  getUsersUrl = 'api/users/all';
  loginUrl = 'api/auth/login';

  constructor(private http: HttpClient) {
  }

  async getMessages() {
    return this.http.get<Message[]>(this.getMessagesUrl).toPromise();
  }

  async getUsers(): Promise<User[]> {
    return this.http.get<User[]>(this.getUsersUrl).toPromise();
  }

  async login(): Promise<LoginStatus> {
    const login = {email: 'sean.maxwell@gmail.com'};
    return this.http.post<any>(this.loginUrl, {login}).toPromise();
  }

}
