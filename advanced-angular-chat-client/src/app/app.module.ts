import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {UsersListComponent} from './users-list/users-list.component';
import {MessagesListComponent} from './messages-list/messages-list.component';
import {MainScreenComponent} from './main-screen/main-screen.component';
import {LoginComponent} from './login/login.component';
import {LoggedUserState} from './states/logged-user.state';
import {NgxsModule} from '@ngxs/store';
import {NgxsFormPluginModule} from '@ngxs/form-plugin';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MessageState} from './states/message.state';
import {NewMessageComponent} from './new-message/new-message.component';
import {ChatState} from './states/chat.state';
import {NgxsWebsocketPluginModule} from '@ngxs/websocket-plugin';
import {UserbarComponent} from './userbar/userbar.component';
import {UsersState} from './states/users.state';

import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';

const config: SocketIoConfig = {
  url: '127.0.0.1:5000/socket.io',
  // options: {rememberTransport: false}
  // options: {transports: ['websocket']}
  options: {}
  // options: {transports: ['websocket', 'polling']}
  // {transports: ['websocket']}
};

// const config: SocketIoConfig = { url: '/socket.io', options: {} };


@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    MessagesListComponent,
    MainScreenComponent,
    LoginComponent,
    NewMessageComponent,
    UserbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxsModule.forRoot([LoggedUserState, MessageState, ChatState, UsersState]),
    SocketIoModule.forRoot(config),
    // NgxsWebsocketPluginModule.forRoot({
    //   url: '/socket.io'
    //   // url: 'ws:/socket.io'
    //   // url: 'ws://127.0.0.1:5000/socket.io'
    //   // url: 'ws://socket.ngrok.io'
    // }),
    NgxsFormPluginModule.forRoot(),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
