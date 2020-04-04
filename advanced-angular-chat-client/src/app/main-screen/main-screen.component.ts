import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent implements OnInit {

  constructor(private apiService: ApiService) {
  }


  async ngOnInit(): Promise<void> {
    console.log(await this.apiService.login());
  }

}
