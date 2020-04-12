import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SendMessage} from "../actions/message.actions";

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss']
})
export class NewMessageComponent implements OnInit {
  constructor(private store: Store) {
  }
  // todo validators
  newMessageForm = new FormGroup({
    text: new FormControl(null, Validators.minLength(5))
  });

  ngOnInit(): void {
  }

  onSubmit() {
    // send message
    this.store.dispatch(new SendMessage());
    this.newMessageForm.reset();
  }
}
