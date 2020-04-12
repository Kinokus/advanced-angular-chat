import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersListComponent} from './users-list/users-list.component';
import {MessagesListComponent} from './messages-list/messages-list.component';
import {MainScreenComponent} from './main-screen/main-screen.component';
import {LoginComponent} from './login/login.component';


const routes: Routes = [
  { path: 'users-list', component: UsersListComponent },
  { path: 'messages-list', component: MessagesListComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: MainScreenComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
