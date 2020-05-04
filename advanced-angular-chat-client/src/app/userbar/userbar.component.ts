import {Component, OnInit} from '@angular/core';
import {Select} from "@ngxs/store";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-userbar',
  templateUrl: './userbar.component.html',
  styleUrls: ['./userbar.component.scss']
})
export class UserbarComponent implements OnInit {

  @Select(state => state.loggedUser.name) loggedUserName$: BehaviorSubject<string>;

  constructor() {
  }

  ngOnInit(): void {
  }

}
