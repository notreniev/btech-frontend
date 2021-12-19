import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../domains/models/user.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  user: UserModel = new UserModel;
  
  constructor() { }

  ngOnInit() {
  }

}
