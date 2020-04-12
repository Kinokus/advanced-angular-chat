import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import User from '../../../advanced-angular-chat-server/src/entities/User';
import Message from '../../../advanced-angular-chat-server/src/entities/Message';
import {LoggedUser} from './models/logged.user';
import {LoginStatus} from './models/login-status';
import {CreateUserStatus} from './models/createUserStatus';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  getMessagesUrl = 'api/messages/all';
  getLatestMessagesUrl = 'api/messages/latest/50';
  addMessageUrl = 'api/messages/add';
  getUsersUrl = 'api/users/all';

  loginUrl = 'api/auth/login';
  private createUserUrl = 'api/users/add';

  constructor(private http: HttpClient) {
  }


  async sendMessage(message: Message) {
    return this.http.post<any>(this.addMessageUrl, message).toPromise();
  }

  async getMessages() {
    return this.http.get<Message[]>(this.getMessagesUrl).toPromise();
  }

  async getLatestMessages() {
    return this.http.get<Message[]>(this.getLatestMessagesUrl).toPromise();
  }

  async getUsers(): Promise<User[]> {
    return this.http.get<User[]>(this.getUsersUrl).toPromise();
  }

  async loginUser(user: LoggedUser): Promise<LoginStatus> {
    // const login = {email: 'sean.maxwell@gmail.com'};
    return this.http.post<LoginStatus>(this.loginUrl, user).toPromise();
  }

  async createUser(user: User): Promise<CreateUserStatus> {
    return this.http.post<CreateUserStatus>(this.createUserUrl, user).toPromise();
  }

}
