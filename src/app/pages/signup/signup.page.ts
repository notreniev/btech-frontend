import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { utils } from 'protractor';
import { UserModel } from '../../domains/models/user.model';
import { UserService } from '../../services/user.service';
import { Severity } from '../../utils';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  user: UserModel = new UserModel();

  constructor(
    private userService: UserService,
    private toastController: ToastController,
    private router: Router
    ) { }

  ngOnInit() {
  }

  async register(user: UserModel){
    if (!user) return;

    try {
      await this.userService
      .create(user)
      .toPromise();
      await this.presentUserFeedback('Registration successful', Severity.SUCCESS);
      setTimeout(() => {
        this.router.navigate(['/signin']);
      }, 2000);
    } catch (error) {
      await this.presentUserFeedback('Registration error', Severity.FAILURE);
    }
  }

  async presentUserFeedback(message: string, severity: string){
    const toast = await this.toastController.create({
      message,
      color: severity,
      cssClass: 'ion-text-center',
      animated: true,
      duration: 3000
    });
    toast.present();
  }

}
