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
    NgxsWebsocketPluginModule.forRoot({
      url: 'ws://socket.ngrok.io'
    }),
    NgxsFormPluginModule.forRoot(),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
